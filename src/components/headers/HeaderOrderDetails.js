import React, { Component, } from 'react';
import {Text, TouchableOpacity, View,Image,StyleSheet, Button,} from "react-native";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShareButton} from "../buttons/ShareButton";

// WithCenterdText
// export default
export class HeaderOrderDetails extends Component {

  constructor(props) {
    super(props);
  }


  render() {


    const MonetaryUnitLogo ='logo-euro';
    const space =' ';
    const MonetaryUnit= (<Ionicons
      // style={{ marginLeft: 10,paddingBottom:22 }}
      name={MonetaryUnitLogo}
      size={20}
      color="darkgrey"
    />);


    // usd
    {/*<ion-icon name="logo-usd"></ion-icon>*/}



    return (
      <View
        style={styles.titleContentStyle}
      >
        {/*Monetary amount and Icon below*/}
        {/*This View*/}
        <View
          style=
            {
              // flex:1,
              styles.horizontalHeaderStyle
            }


        >
          {/*This View*/}

          {/*This View*/}
          <View>
            <Text style={styles.title}>

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
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  pageHeading:{
    fontSize: 26,
    fontWeight:'bold',
    color:'darkslategrey',
  },
  horizontalHeaderStyle:{
    flexDirection: 'column',
    marginHorizontal: 10,
    paddingLeft: 20,
    paddingTop: '5%',
  },
  topHeaderViewWrapper:{
    paddingTop: '3%',
  },

  price: {
    fontSize: 20,
    textAlign: 'center',
    color: 'darkgrey',
  },

  title:{
    fontSize: 26,
    fontWeight:'bold',
    textAlign: 'center',
    color: 'grey',
  },
  titleContentStyle:{
    flexDirection:'row',
    justifyContent: 'space-between',
    borderBottomColor:'dimgrey',
    borderBottomWidth:StyleSheet.hairlineWidth,
  }

});