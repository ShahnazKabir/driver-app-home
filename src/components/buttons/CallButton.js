import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


// WithCenterdText
// export default
export class CallButton extends Component{

    constructor(props) {
        super(props);
    }

  render(){

        return(
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <View  style={{alignSelf:'center',alignItems:'center'}}>
                    <Ionicons
                        name="ios-call"
                        size={30}
                        color={this.props.color}
                    />
                    <Text
                        style={{alignSelf:'center', color: this.props.color}}>
                        Call Client
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}