import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ProgressCircle from 'react-native-progress-circle';
import markerIcon from '../../assets/icons/drawable-hdpi/mark.png';
import fonts from '../fonts/fonts';
import mapSnap from '../../assets/mapTab.png';
import Snackbar from "react-native-snackbar";
const screenTab = Dimensions.get('window').width > 700;

export default class OrderCard extends Component {
  constructor(props) {
    super(props);
  }

  onPressEvent(orderData) {
    if(this.props.orderData.status !== 3) {
      Snackbar.show({
        title: 'Complete Previous Order First.',
        backgroundColor: 'red',
      });
    }
    //passing address data to driver navigation page
    else if (typeof this.props.pressEvent === 'function') {
      this.props.pressEvent(orderData);
    }
  }

  render() {

   // console.log('this.props.orderData',this.props.orderData);
    return (
      <View>
        {/* using order list data item as props to show each  item on order card. Received props: order item */}
        <View style={{marginLeft: 20}}>
          <Text style={orderStyle.dateFont}>{this.props.orderData.deliveryDateTime}</Text>
        </View>
        <View style={orderStyle.listView}>
          <View style={orderStyle.container}>
            <View style={orderStyle.mapFlex}>
              {/*map view. on press it will redirect to driver navigation page*/}
              {/* eslint-disable-next-line eqeqeq */}
              <TouchableOpacity onPress={()=>this.onPressEvent(this.props.orderData)}>
                <Image source={mapSnap} style={orderStyle.mapView}/>
              </TouchableOpacity>
            </View>
            <View style={orderStyle.detailStyle}>
              {/*address shown on card*/}
              {this.props.orderData.status === 3 && <Text style={orderStyle.statusFont}>On His Way</Text>}
              <Text style={orderStyle.addressFont}>{this.props.orderData.destination}</Text>
              <Text style={orderStyle.textStyle}>{this.props.orderData.distance}</Text>
              {/*timer of each order item*/}
              <ProgressCircle
                percent={this.props.orderData.timeLimit}
                radius={screenTab ? 40 :  30}
                borderWidth={4}
                color="red"
                shadowColor="#999"
                bgColor="#fff"
                style={orderStyle.progressBarStyle}
              >
                <Text style={{ fontSize: 22, fontWeight: fonts.Bold }}>{this.props.orderData.timeLimit}</Text>
              </ProgressCircle>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const orderStyle = StyleSheet.create({
  addressFont: {
    fontSize: screenTab ? 18: 12,
    fontWeight: fonts.Regular,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },

  dateFont: {
    fontSize: screenTab ? 16: 12,
    fontWeight: fonts.Thin,
    marginBottom: 10,
    marginTop: 10,
  },

  detailStyle : {
    alignItems: 'flex-start',
    flex: .3,
    justifyContent: 'space-between',
  },

  listView : {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    margin: 5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  mapFlex: {
    flex: .7,
    marginRight: 15,
  },
  mapView: {
    borderRadius: 20,
    flex: 1,
    height: screenTab ? 215 : 150,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  progressBarStyle : {
    marginLeft: 10,
    marginTop: 5,
  },
  statusFont: {
    color: 'green',
    fontSize: screenTab ? 18: 12,
    fontWeight: fonts.Regular,
  },
  textStyle: {
    color: '#5f9cec',
    fontSize: screenTab ? 23 : 16,
    fontWeight: fonts.Regular,
  },
});