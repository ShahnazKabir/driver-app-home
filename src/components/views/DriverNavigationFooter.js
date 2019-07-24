import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CallButton} from '../buttons/CallButton';
import SubmitButton from '../buttons/SubmitButton';

export default class DriverNavigationFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={
        styles.BottomHorizontalRow
      }>
        <View style={{marginHorizontal:10}}>
          <CallButton
            color={this.props.color}
            onPress = {this.props.callEvent}
          />
        </View>
        <View style={{marginHorizontal:10}}>
          <SubmitButton
            buttonText={this.props.buttonText}
            color = '#FF6969'
            submitEvent = {this.props.submitEvent}
            id={this.props.orderId}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BottomHorizontalRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: '5%',
    marginTop: '3%',
  },
});
