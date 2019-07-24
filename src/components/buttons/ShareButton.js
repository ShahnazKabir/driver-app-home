import React, { Component } from 'react';
import {Text, TouchableOpacity, View,StyleSheet} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';



// WithCenterdText
// export default
export class ShareButton extends Component{

    // constructor(props) {
    //     super(props);
    // }
    render(){
        const shareIcon=(<Ionicons
            name= "ios-share"
            size = {30}
            color={this.props.color}
        />);
        let shareText=null;
        if( this.props.color==='grey'){
            shareText =(
                <Text style={{color:'grey', fontSize:18}}>Share</Text>);
        }
        else{
            const shareTextPart1= (<View><Text style={{color:'skyblue', fontSize:18}}>Shar</Text></View>) ;
            const shareTextPart2 =(<View><Text style={{color:'crimson',fontSize:18}}>ed</Text></View>);

            shareText = (<View style={{
                    // flex:1,
                    flexDirection:'row',
                }}>
                    {shareTextPart1}
                    {
                        shareTextPart2
                    }
                </View>
            );
        }
        return(

            <TouchableOpacity
                onPress={this.props.onPress}
            >
                {/*share Icon and Share Text below*/}
                <View style={
                    styles.shareIconTextColumn
                }>
                    <View>
                        <Text style={styles.title}>
                            {shareIcon}
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View>
                                {shareText}
                        </View>
                    </View>
                </View>

                {/*share Icon and Share Text above*/}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    // regular:{
    //     color: 'darkgrey',
    //     fontSize: 20,
    //     textAlign: 'center',
    // },
    shareIconTextColumn:{
        flexDirection: 'column',
        marginHorizontal: 10,
        paddingRight: 10,
    },

    title:{
        color: 'grey',
        fontSize: 26,
        fontWeight:'bold',
        textAlign: 'center',
    },
});
