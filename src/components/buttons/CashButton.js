import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// WithCenterdText
// export default
export class CashButton extends Component{

    // constructor(props) {
    //     super(props);
    // }
    render(){

        return(
        <TouchableOpacity
            onPress={this.props.onPress}
        >
            {/*<View>*/}
                {/*<Ionicons*/}
                    {/*name="ios-wallet"*/}
                    {/*size={40}*/}
                    {/*color={this.props.color}*/}
                {/*/>*/}
                {/*<Text style={{alignSelf:'center'}}>Cash</Text>*/}
            {/*</View>*/}


            <View>
                <SimpleLineIcons
                  name="credit-card"
                  size={40}
                  color={this.props.color}
                />
                <Text style={{alignSelf:'center'}}>Card</Text>
            </View>


        </TouchableOpacity>

        );
    }
}



