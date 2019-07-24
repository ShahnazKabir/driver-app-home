import React, { Component } from 'react';
import {View,StyleSheet} from "react-native";
import { CallButton } from "../buttons/CallButton";
import { CheckOutButton } from "../buttons/CheckOutButton";



// WithCenterdText
// export default
export class OrderedItemsFooter extends Component{

  // constructor(props) {
  //     super(props);
  // }
  render(){
    return(
      <View style={
        styles.BottomHorizontalRow
      }>
        <View style={{marginHorizontal:30}}>

          <CallButton
            color = {
              this.props.callButtonColor
            }
            onPress = {
              this.props.callButtonPress
            }
          />
        </View>
        <View style={{marginHorizontal:30}}>

          <CheckOutButton
            color={this.props.checkOutButtonColor}
            onPress={this.props.checkoutButtonPress}
          />
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({

  BottomHorizontalRow:{
    alignItems:'center',
    // backgroundColor:'cornsilk',
    flex:0.7,
    flexDirection:'row',
    justifyContent:'space-between',


  },
});
