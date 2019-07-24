import React, { Component } from 'react';
import {Text, TouchableOpacity, View,Image,StyleSheet, Button} from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShareButton} from "../buttons/ShareButton";

// WithCenterdText
// export default
export class HeaderOrderedItems extends Component {

    constructor(props) {
        super(props);
    }


    render() {





        const MonetaryUnitLogo ='logo-euro';
        const space =' ';
        const MonetaryUnit= (<Ionicons
          // style={{ marginLeft: 10,paddingBottom:22 }}
          name={MonetaryUnitLogo}
          size={16}
          color="darkgrey"
        />);




        // usd
        {/*<ion-icon name="logo-usd"></ion-icon>*/}



        return (
          <View
            style={styles.headerTitleContentStyle}
          >
              {/*Monetary amount and Icon below*/}
              {/*This View*/}
              <View
                style=
                  {
                      // flex:1,
                      styles.horizontalListHeaderStyle
                  }


              >
                  {/*This View*/}

                  {/*This View*/}
                  <View>

                      {/*<Text style={styles.title}>*/}

                      {/*</Text>*/}
                      <Text style={styles.title}>
                          <Ionicons
                            name="ios-list-box"
                            size = {26}
                            color='grey'
                          >
                          </Ionicons>
                      </Text>
                  </View>
                  {/*This View*/}
                  <View
                    style={
                        styles.headerMoneyTextViewWrapper
                    }
                  >
                      <View>
                          <Text style={[styles.price,

                          ]}>
                              {/*{totalPrice}*/}

                              {this.props.totalPrice}
                              {space}
                              {MonetaryUnit}
                          </Text>
                      </View>
                  </View>
              </View>
              {/* Monetary amount and Icon above*/}


              {/*Order Details style below*/}
              <View
                style={styles.topHeaderViewWrapper
                }
              >
                  <Text style={styles.pageHeading}>
                      Order Details
                  </Text>
              </View>
              {/*Order Details style above*/}
              <View style={{
                  paddingTop: '6%',
              }}>
                  <ShareButton
                    color={this.props.color}
                    onPress={this.props.onPress}
                  />
              </View>

          </View>);
    }
}


const styles = StyleSheet.create({
    headerMoneyTextViewWrapper:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerTitleContentStyle:{
        borderBottomColor:'dimgrey',
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop:'3%',

    },
    horizontalListHeaderStyle:{
        flexDirection: 'column',
        marginHorizontal: 10,
        paddingLeft: 10,
        paddingTop: '7.8%',
    },
    pageHeading:{
        color:'darkslategrey',
        fontSize: 20,
        fontWeight:'bold',
    },
    price: {
        color: 'darkgrey',
        fontSize: 18,
        fontWeight:'bold',
        textAlign: 'center',
    },
    title:{ // same as shareButton's title style
        color: '#515C6F',
        fontSize: 26,
        fontWeight:'bold',
        textAlign: 'center',
    },

    topHeaderViewWrapper:{
        paddingBottom:'12%',
        paddingTop: '2%',
        // paddingTop: '6%',

    },

});