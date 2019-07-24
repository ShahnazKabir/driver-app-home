import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import OrderCard from '../cards/OrderCard';

// eslint-disable-next-line react/prefer-stateless-function
class OrderListBody extends Component {
  constructor(props) {
    super(props);
  }

  //using flatlist to provide the order components within a scrollview
  render() {
    // console.log('props/data: ',this.props);
    return (
      <View>
        {/* using flatlist to show order list and order card contains each order. Received props: orderList, send props: orderItem to each order card*/}
        <FlatList
          data={this.props.orderList}
          renderItem={({ item }) => (

            <OrderCard orderData={item} pressEvent={this.props.pressEvent}></OrderCard>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }

}

export default OrderListBody;
