import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../fonts/fonts';

// WithCenterdText
// export default
export default class LogoutButton extends Component{
  constructor(props) {
      super(props);
  }
  render(){

    return(
      //logout button design. Received props: logout event from order list page as props
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <View  style={{alignSelf:'center',alignItems:'center'}}>
          <Ionicons
            name="ios-log-out"
            size={25}
            color='#F55706'
            style={{fontWeight: fonts.Medium}}
          />
          <Text
            style={{alignSelf:'center', color: '#F55706'}}>
            logout
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}