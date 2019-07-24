import React, { Component } from 'react';
import {Text, TouchableOpacity, View} from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from "../OrderedItems";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


// WithCenterdText
// export default
export class CardButton extends Component{

    // constructor(props) {
    //     super(props);
    // }
    render(){

        return(
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <View>
                    <SimpleLineIcons
                      name="wallet"
                      size={40}
                      color={this.props.color}
                    />
                    <Text style={{alignSelf:'center'}}>Cash</Text>
                </View>


                {/*<View>*/}
                    {/*<Ionicons*/}
                      {/*name="ios-card"*/}
                      {/*size={40}*/}
                      {/*color={this.props.color}*/}

                    {/*/>*/}
                    {/*<Text style={{alignSelf:'center'}}>Card</Text>*/}
                {/*</View>*/}
            </TouchableOpacity>
        );
    }
}



