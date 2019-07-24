import React, { Component } from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from "react-native";

import { UnpaidButton } from "../buttons/UnpaidButton";
import { CardButton } from "../buttons/CardButton";
import { CashButton } from "../buttons/CashButton";



// WithCenterdText
// export default
export class HorizontalActionButtonsInBody extends Component{

  constructor(props) {
    super(props);
  }

  render(){


    // console.log("All props in (HorizontalActionButtonsInBody):",this.props);
    return(

      <View style={
        styles.HorijontalButtonRow}>
        <View style={{marginHorizontal:30}}>
          <UnpaidButton
            color={this.props.UnpaidButtonColor}
            onPress={this.props.UnpaidButtonPress}
          />
        </View>
        <View style={{marginHorizontal:30}}>
          <CardButton
            color={this.props.CardButtonColor}
            onPress={this.props.CardButtonPress}
          />
        </View>
        <View style={{marginHorizontal:30}}>
          <CashButton
            color={this.props.CashButtonColor}
            onPress={this.props.CashButtonPress}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  HorijontalButtonRow:{
    alignItems:'center',
    borderBottomColor:'dimgrey',
    borderBottomWidth:StyleSheet.hairlineWidth,
    flex:1,
    flexDirection:'row',
    // justifyContent:'center',
    justifyContent:'space-around',

  },
});
