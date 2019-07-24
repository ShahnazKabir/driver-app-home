  import React, { Component } from 'react';
  import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar,
  AsyncStorage,
  Platform,
  PermissionsAndroid, ActivityIndicator
} from "react-native";
  import OrderListBody from './../views/OrderListBody';
  import isEqual from 'lodash/isEqual';
  import OrderListHeader from './../views/OrderListHeader';
  import { connect } from 'react-redux';
  import { getOrderList, clearAuthStore, driverStatus, setOrderData } from './../../stores/actions';
  import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
  import haversine from 'haversine';

  //data to control accuracy
  const GEOLOCATION_OPTIONS = { enableHighAccuracy: false, timeout: 20000 };

  class OrderListPage extends Component {
    constructor(props) {
      super(props);
      //static data to populate order list
      this.state = {
        order: [
          // {
          //   id: '1',
          //   region: {
          //     latitude: 62.838880,
          //     longitude: 27.643540,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   },
          //   destination: 'Pyörönkaari 24, 70820 Kuopio, Finland',
          //   distance: '5km',
          //   timeLimit: 90,
          //   deliverydate: 'JAN 10',
          //   deliveryTime: '11 PM',
          // },
          // {
          //   id: '2',
          //   region: {
          //     latitude: 23.783502,
          //     longitude: 90.421782,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   },
          //   destination: 'Kenakata Store, Gudaraghat',
          //   distance: '5km',
          //   timeLimit: 10,
          //   deliverydate: 'JAN 10',
          //   deliveryTime: '11 PM',
          // },
          // {
          //   // Greeces parliament.
          //   id: '3',
          //   region: {
          //     latitude: 23.822350,
          //     longitude: 90.365417,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   },
          //   destination: 'Mirpur 11, Dhaka,1215',
          //   distance: '5km',
          //   timeLimit: 90,
          //   deliverydate: 'JAN 10',
          //   deliveryTime: '11 PM',
          // },
          // {
          //   id: '4',
          //   region: {
          //     latitude: 43.213950,
          //     longitude: -77.726280,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   },
          //   destination: 'Parliament of Greece',
          //   distance: '3305km',
          //   timeLimit: 2970,
          //   deliverydate: 'APR 28',
          //   deliveryTime: '11 PM',
          // },
        ],
        authorized: false,
        myPosition: null,
      };
      //function to redirect to driver navigation page
      this.redirect = this.redirect.bind(this);
      //function to logout the driver
      this.logout = this.logout.bind(this);
      //function to set timer for each order
      this.checkAllTimer = this.checkAllTimer.bind(this);
      this.fetchCurrentPosition = this.fetchCurrentPosition.bind(this);
      this.fetchOrderList = this.fetchOrderList.bind(this);
      this.checkPermission = this.checkPermission.bind(this);
      this.setDistance = this.setDistance.bind(this);
    }

    componentDidMount() {
      this.fetchOrderList();
    }

    fetchOrderList() {
      //fetch order list data from backend using a demno api url
      // const order = [];
      this.props.getOrderList()
        .then(response => {
          console.log(this.props.listData)
          if(this.props.errorStatus == 401) {
            AsyncStorage.removeItem('user');
            this.props.clearAuthStore();
            this.props.navigation.navigate('SplashScreen');
          } else {
            this.checkPermission();
            this.setState({authorized : true})
            this.setState(state => {
              const order = this.props.listData.map((orderData, index) => {
                let orderObj = {
                  id: null,
                  region: {
                    latitude: null,
                    longitude: null,
                  },
                  destination: '',
                  distance: null,
                  timeLimit: null,
                  deliveryDateTime: '',
                  status: null,
                  orderApiData: null,
                };
                orderObj.id = orderData.id;
                orderObj.region.latitude = orderData.latitude ? orderData.latitude : null;
                orderObj.region.longitude = orderData.longitude ? orderData.longitude : null;
                const date = (new Date(orderData.orderTime)).toString();
                orderObj.deliveryDateTime = date.substring(4,10) + '-' + date.substring(16,22);
                const date1 = parseInt((new Date(orderData.warningTime).getTime() - new Date().getTime()) / 60000);
                orderObj.timeLimit = date1 > 0 ? date1 : 0;
                orderObj.destination = orderData.address;
                orderObj.status = orderData.status;
                orderObj.orderApiData = orderData;
                orderData = orderObj;
                return orderData;
              });
              return {
                order,
              };
            });
            //set timer seperately for each order
            var timer = setInterval(() => (
              this.checkAllTimer(timer)
            ), 60000);
          }
        });
    }

    checkPermission() {
      if (Platform.OS === 'android') {
        //ask for location permission on map
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
                .then(data => {
                  this.fetchCurrentPosition();
                });
            }
          });
      } else {
        this.fetchCurrentPosition();
      }
    }

    fetchCurrentPosition() {
      //fetch current position using geolocation
      navigator.geolocation.getCurrentPosition((position) => {
        const myLastPosition = this.state.myPosition;
        const myPosition = position.coords;

        //set current location
        if (!isEqual(myPosition, myLastPosition)) {
          this.setState({ myPosition });
          this.setDistance();
        }
      }, (error) => {
      }, GEOLOCATION_OPTIONS);
    }

    setDistance() {
      this.setState(state => {
        const order = state.order.map((item, j) => {
          if(item.region.latitude && this.state.myPosition.latitude) {
            item.distance = parseInt(haversine(this.state.myPosition, item.region));
          }
          return item;
        });

        return {
          order,
        };
      });
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
      if(this.props.navigation.dangerouslyGetParent().state.routes.length === 1) {
        BackHandler.exitApp();
        true;
      } else if(this.props.navigation.dangerouslyGetParent().state.routes.length === 2 && this.props.navigation.dangerouslyGetParent().state.routes[0].routeName === 'LoginScreen') {
        BackHandler.exitApp();
        true;
      }
    }

    checkAllTimer(timer) {
      //check if all the timer set to 0
      const found = this.state.order.find((element) => element.timeLimit > 0);
      //if all timer value is not 0 then countdown continues
      if(found) {
        this.setState(state => {
          const order = state.order.map((item, j) => {
            if (item.timeLimit > 0) {
              item.timeLimit -= 1;
            }
            return item;
          });

          return {
            order,
          };
        });
      } else {
        //clear timer if all timer value is 0
        clearInterval(timer);
      }
    }

    redirect(order) {
      //redirect to driver navigation page
      this.props.setOrderData(order.orderApiData)
        .then(response => {
          this.props.driverStatus(order.id, '3')
            .then(response => {
              if(this.props.errorStatus == 401) {
                AsyncStorage.removeItem('user');
                this.props.clearAuthStore();
                this.props.navigation.navigate('SplashScreen');
              }
              this.props.navigation.navigate('Target', {
                orderValue: order,
              });
            });
        });

    }

    logout = async () => {
      //clear logout credential from async storage
      try {
        const localCredentialValue = await AsyncStorage.getItem('user');
        if (localCredentialValue != null) {
          try {
            await AsyncStorage.removeItem('user', (err, result) => {
              //after clearing async storage redirect to splash screen
                if (err) {
                  return;
                }
                if (result) {
                  this.props.clearAuthStore();
                  this.props.navigation.navigate('SplashScreen');
                  return result;
                }
              this.props.clearAuthStore();
              this.props.navigation.navigate('SplashScreen');
              },
            );
          } catch (error) {
          }

        }
      }
      catch (error) {
      }
    };

    render() {
      return (
        <View style={listStyle.orderListContainer}>
          {/*setting status bar color according to page background color*/}
          <StatusBar backgroundColor={'#F7F7FA'} barStyle="dark-content"/>
          <View style={listStyle.listheaderFlex}>
            {/* Order list page header component. props: logoutEvent*/}
            <OrderListHeader logoutEvent={this.logout}></OrderListHeader>
          </View>
          { this.state.authorized ?
            <View style={listStyle.listbodyFlex}>
              {/* order list body containing all the list items. props: redirect event, order list*/}
              {this.state.order &&  <OrderListBody pressEvent={this.redirect} orderList={this.state.order}></OrderListBody>}
            </View>
            : <View style={[listStyle.container01_for_login_only]} key={'sasas1251231234123rArefin'}>
                <ActivityIndicator
                  size='large'
                  color='#FF6969'
                />
          </View>}
        </View>
      );
    }
  }

  const listStyle = StyleSheet.create({
    container01_for_login_only: {
      alignContent: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    listbodyFlex: {
      flex: .9,
    },
    listheaderFlex: {
      flex: .1,
      justifyContent: 'center',
      marginBottom: 5,
    },
    orderListContainer: {
      backgroundColor: '#F7F7FA',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

  const mapStateToProps = state =>
    //maps state of redux to component props
     ({
      listData: state.orderList.orderListData,
       errorStatus: state.orderList.errorMsg,
    })
  ;

  //make a connection between action, reducer and component
  export default connect(
    mapStateToProps, {getOrderList, clearAuthStore, driverStatus, setOrderData}
  )(OrderListPage);