import React, { Component } from 'react';
import { View, PermissionsAndroid, Platform, StyleSheet, Image, Linking, AsyncStorage } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import type { JsOutput } from 'metro/src/JSTransformer/worker';
import Polyline from '@mapbox/polyline';
import Footer from './DriverNavigationFooter';
import haversine from 'haversine';
import markerIcon from '../../assets/icons/drawable-hdpi/triangle.png';
import carIcon from '../../assets/icons/drawable-xxxhdpi/car-purple.png';
import Snackbar from 'react-native-snackbar';
import BackgroundTask from 'react-native-background-task';
import { connect } from 'react-redux';
import { driverLocationUpdate } from './../../stores/actions';

//data to control accuracy
const GEOLOCATION_OPTIONS = { enableHighAccuracy: false, timeout: 20000 };
//map madding on setting the whole coordinates within the map
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
//used for marker positioning
const ANCHOR = { x: 0.5, y: 0.5 };

var myLocation = null;

BackgroundTask.define(async () => {
  // Fetch some data over the network which we want the user to have an up-to-
  // date copy of, even if they have no network when using the app
  console.log(myLocation);
  let orderData = this.props.orderObj;
  //here's the api call
  // Remember to call finish()
  BackgroundTask.finish();
})

export default class DriverNavigationBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosition: null, //current location
      coords: [],//direction point
      reachFlag: true,//a flag to check if driver reach destination
      url: '',//url to open map using deep linking
      call_Client_Color:'#F55706',
      mapReady: false,//a flag to check component on map is rendered when map is ready.
    };
    //function to handle url opened with deep linking
    this.handleUrl = this.handleUrl.bind(this);
  }

  componentDidMount() {
    // If you supply a coordinate prop, we won't try to track location automatically
    if (this.props.coordinate) return;

    if (Platform.OS === 'android') {
      //ask for location permission on map
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
              .then(data => {
                this.fetchCurrentPosition();
              }).catch(err => {
              this.setState({reachFlag: true});
              this.onMapLayout();
            });
          } else {
            this.setState({reachFlag: true});
            this.onMapLayout();
          }
        })
        .catch(error => {console.log(error);});
    } else {
      this.fetchCurrentPosition();
    }
  }

  // eslint-disable-next-line class-methods-use-this

  fetchCurrentPosition() {
    //fetch current position using geolocation
    navigator.geolocation.getCurrentPosition((position) => {
      const myLastPosition = this.state.myPosition;
      const myPosition = position.coords;

      //set current location
      if (!isEqual(myPosition, myLastPosition)) {
        this.setState({ myPosition });
      }

      //calculate driver distance from delivery location
      //if driver with hundred meter region then driver can contact client. dont need the navigation
      if(this.props.orderData.region.latitude && this.props.orderData.region.longitude) {
        if(haversine(myPosition, this.props.orderData.region, {unit: 'meter'}) <= 30) {
          Snackbar.show({
            title: 'Your have reached the destination. You can call the client.',
            backgroundColor: 'green',
          });
          this.setState({
            reachFlag: true,
          });
          Linking.removeEventListener(this.state.url, this.startNavigate(this.state.url));
        } else {
          //if distance greater than 100 then fetch direction
          this.fetchDirection(this.state.myPosition);
        }
      } else {
        this.setState({reachFlag: true});
        this.onMapLayout();
      }
    }, (error) => {
      if (error.code == 1) {
        this.onMapLayout();
      }
    }, GEOLOCATION_OPTIONS);
  }

  async fetchDirection (currentLocation) {
    //use google map api to fetch direction from current location
    //current location fetched using geolocation
    const currLoc = currentLocation.latitude + ',' + currentLocation.longitude;
    //client order location details
    // const orderData = this.props.orderData.region;
    // const customerLoc = orderData.latitude + ',' + orderData.longitude;
    const customerLoc = this.props.orderData.destination.split(' ').join('+');

    try {
      //use google map direction api to fetch direction from current location
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${currLoc}&destination=${customerLoc}1&key=AIzaSyA-8vNxTime5IoEi6gauOqBMtZ9wI3rdpY`);
      const respJson = await resp.json();
      //overview_polyline is a encoded coordinates list. to get the route coordinates it need to be decoded
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => ({
        latitude : point[0],
        longitude : point[1],
      }));
      this.setState({coords});
      this.calculateBearing(this.state.coords);
      this.onMapLayout();
      return coords;
    } catch(error) {
      this.setState({coords: []});
      this.onMapLayout();
      return error;
    }
  }

  calculateBearing(coords) {
    if(this.state.coords.lentgh >= 2) {
      var lat1 = coords[0].latitude;
      var lon1 = coords[0].longitude;
      var lat2 = coords[1].latitude;
      var lon2 = coords[1].longitude;
      var bearingAngle = Math.atan2(Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)* Math.cos(lat2)* Math.cos(lon2-lon1),
        Math.sin(lon2-lon1)* Math.cos(lat2));
      this.setState({bearingAngle});
    }
  }

  onMapLayout = () => {
    //if direction is fetched then fit the map according to route
    if(this.state.coords.length) {
      this.mapRef.fitToCoordinates(
        this.state.coords,
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );
    } else if(this.state.myPosition && this.props.orderData.region.latitude) {
      //if direction not fetched yet it is checked whether current position is fetched
      this.mapRef.fitToCoordinates(
        [this.state.myPosition, this.props.orderData.region],
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );
    } else if(this.props.orderData.region.latitude){
      //if no direction then map just set to destination region
      this.mapRef.fitToCoordinates(
        [this.props.orderData.region],
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );
    } else if(this.state.myPosition) {
      this.mapRef.fitToCoordinates(
        [this.state.myPosition],
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );
    }
    this.setState({
      mapReady: true,
    });
  }

  handleUrl() {
    BackgroundTask.schedule()
    //use client location to set it in google map when map will be opened with deep linking
    const customerLoc = this.props.orderData.destination.split(' ').join('+');
    let url = '';
    //set google map api url based on platform
    //using deep linking to navigate the driver using google map
    if(Platform.OS === 'android') {
      url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${customerLoc}`;
    } else {
      url = `http://maps.apple.com/maps?daddr=${customerLoc}`;
    }
    //url is set for further use
    this.setState({
      url,
    });
    //linking event is subscribed
    Linking.addEventListener( url, this.startNavigate(url));
  }

  startNavigate(url) {
    //start tha google map navigation. Linking opens the url when start button is pressed
    if(url) {
      const f = Platform.select({
        ios: () => {
          Linking.openURL(url);
        },
        android: () => {
          Linking.openURL(url).catch(err => console.error('An error occurred', err));
        },
      });

      f();
    }
  }

  componentDidUpdate() {
    //when the component is reneder watchLocation event is called to continuously track driver location
    if(!this.watchID && this.state.myPosition) {
      this.watchLocation();
    }
  }

  watchLocation() {
    const orderData = this.props.orderData.region;
    //watch driver position with change of location

    this.watchID = navigator.geolocation.watchPosition((position) => {
      const myLastPosition = this.state.myPosition;
      const myPosition = position.coords;

      if (!isEqual(myPosition, myLastPosition)) {
        this.setState({ myPosition });
      }

      myLocation = myPosition;

      //calculate driver distance from delivery location
      if(this.props.orderData.region.latitude && this.props.orderData.region.longitude) {
        if(haversine(myPosition, this.props.orderData.region, {unit: 'meter'}) <= 30) {
          Snackbar.show({
            title: 'Your have reached the destination. You can call the client.',
            backgroundColor: 'green',
          });
          this.setState({
            reachFlag: true,
          });
          Linking.removeEventListener(this.state.url, this.startNavigate(this.state.url));
        } else {
          //if distance greater than 100 then fetch direction
          this.fetchDirection(this.state.myPosition);
        }
      }
      //set current location
    }, null, GEOLOCATION_OPTIONS);
  }

  componentWillUnmount() {
    //clear google map watch positin
    // clearInterval(timer);
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    let { coordinate } = this.props;
    if (!coordinate) {
      const { myPosition } = this.state;
      // if (!myPosition) return null;
      coordinate = myPosition;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{flex: .9, justifyContent: 'center', alignItems: 'center'}}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={mapStyle.map}
            ref={ref => this.mapRef = ref}
            scrollEnabled
            showUserLocation
            followUserLocation
            loadingEnabled
            initialRegion={{
              latitude: 62.838880,
              longitude: 27.643540,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onLayout={this.onMapLayout}
          >
            {/*driver current location marker*/}
            {(this.state.mapReady && coordinate) && <MapView.Marker
              coordinate={{ latitude: coordinate.latitude,
                longitude: coordinate.longitude}}
              anchor={ANCHOR}
              rotation={this.state.bearingAngle}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={carIcon}
              />
            </MapView.Marker>}
            {/*driver current location to client location route*/}
            {(this.state.mapReady && this.state.coords) && <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={7}
              strokeColor="#64BCFF"/>}
            {/*client location marker*/}
            {(this.state.mapReady && this.props.orderData.region.latitude) && <MapView.Marker
              coordinate={{ latitude: this.props.orderData.region.latitude,
                longitude: this.props.orderData.region.longitude}}
              anchor={ANCHOR}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  transform: [{
                    rotate: '180deg',
                  }],
                }}
                source={markerIcon}
              />
            </MapView.Marker>}
          </MapView>
        </View>
        <View style={{flex: .1}}>
          {/*footer containing the call and submit or start button*/}
          <Footer
            callEvent={this.props.callEvent}
            color={this.state.call_Client_Color}
            buttonText={this.state.reachFlag ? 'Submit' : 'Start' }
            submitEvent={ this.state.reachFlag ? this.props.submitOrder : this.handleUrl}
            orderId={this.props.orderData.id}
          ></Footer>
        </View>
      </View>
    );
  }

}


const mapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
});

const mapStateToProps = state =>
  //maps state of redux to component props
  ({
    orderObject: state.orderList.orderObj,
  })
;

//make a connection between action, reducer and component
connect(
  mapStateToProps, {driverLocationUpdate}
)(DriverNavigationBody);