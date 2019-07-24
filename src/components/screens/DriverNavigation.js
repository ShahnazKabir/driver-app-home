import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Body from '../views/DriverNavigationBody';
import call from 'react-native-phone-call';

//call parameter
const args = {
  number: '+8801819042984', // String value with the number to call
  prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
};

export default class DriverNavigation extends Component {
  constructor(props) {
    super(props);
    //function to redirect to order details page when driver reach destination
    this.submitOrder = this.submitOrder.bind(this);
    //fucntion to call the client
    this.callClient = this.callClient.bind(this);
  }

  callClient () {
    //call function implementation
    this.setState({
      call_Client_Color:'#008AF3',
    });
    call(args).catch(console.error);
  }

  submitOrder(id) {
    //navigate to order details page
    this.props.navigation.navigate('OrderedItems', {
      orderId : id,
    });
  }

  render() {
    const { navigation } = this.props;
    const orderValue = navigation.getParam('orderValue', '1');
    return (
      <View style={navStyle.container}>
        {/*set status bar*/}
        <StatusBar backgroundColor={'#F7F7FA'} barStyle="dark-content"/>
        {/*driver navigation body containing the map route. Send props: order item received from order list page, call Event, submit event*/}
        <Body orderData={orderValue} callEvent={this.callClient} submitOrder={this.submitOrder}></Body>
      </View>
    );
  }
}


const navStyle = StyleSheet.create({
  bodyFlex: {
    flex: .9,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footerFlex : {
    flex: .1,
  },
  headerFlex: {
    borderRadius: 20,
    height: '16%',
    marginLeft: 10,
    marginRight: 10,
    position: 'absolute',
  },
});