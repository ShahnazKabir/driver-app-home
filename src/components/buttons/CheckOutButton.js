import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExtraDimensions from "react-native-extra-dimensions-android";
import PropTypes from "prop-types";

// WithCenterdText
// export default
export class CheckOutButton extends Component{

  render(){

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
      ? Dimensions.get("window").height
      : ExtraDimensions.get("REAL_WINDOW_HEIGHT");

    return(

      <View style={{flexDirection: 'column',flex:1,justifyContent:'center',alignItems:'center'}}>
       <TouchableOpacity
        onPress={this.props.onPress}
      >
        <View elevation={5} style={
          [styles.checkoutButton, {
            backgroundColor: this.props.color,
            width: deviceWidth * 0.41,
            height: deviceHeight * .055,
            borderRadius:deviceHeight * .055/2,
          }]
        }>

          <Text style={styles.checkoutTextStyle}>Checkout</Text>

          <MaterialIcons
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 14,
              height: 28,
              width: 28,
            }}
            name="keyboard-arrow-right"
            size={28}
            color={this.props.color}
          />
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // arrowIconViewWrapper: {
  // alignItems:'center',
  //   alignSelf:'center',
  //   backgroundColor: 'white',
  //   borderRadius:12,
  //   height: 25,
  //   marginLeft:7,
  //   width: 25,
  //
  // },
  checkoutButton: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    zIndex: 40,
  },
  // checkOutTextWrapperView:{
  //   alignItems:'center',
  //   alignSelf:'center',
  //   paddingLeft:6,
  //   paddingRight:15,
  // },
  checkoutTextStyle:{
    alignItems:'center',
    alignSelf:'center',
    color:'white',
    flexGrow: 1,
    fontWeight: 'bold',
    justifyContent:'center',
    marginLeft:'0.4%',
    textAlign: 'center',
  },

});





CheckOutButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};
CheckOutButton.defaultProps = {};



