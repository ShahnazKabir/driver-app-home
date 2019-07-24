import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// WithCenterdText
// export default
export class UnpaidButton extends Component{

    // constructor(props) {
    //     super(props);
    // }
    render(){

        // _onPressButtonTouch_APP


        let touchAppText=null;


        touchAppText =(
          <Text style={{color:'#FF6969',alignSelf:'center' }}>Unpaid</Text>);

        // else{
        //     touchAppText =(
        //       <Text style={{color:'grey',alignSelf:'center' }}>Unpaid</Text>);
        // }

        return(
          <TouchableOpacity
            onPress={this.props.onPress}
          >
              <View  style={{alignSelf:'center',alignItems:'center'}}>
                  <MaterialIcons
                    name="remove-circle-outline"
                    size={40}
                    color='#FF6969'
                  />
                  {touchAppText}
              </View>
          </TouchableOpacity>

        );
    }
}



