import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import PropTypes from 'prop-types';
import LoginButton from '../buttons/LoginButton';
import OrderedItems from '../screens/OrderedItems';



// WithCenterdText
// export default
export class ItemCardImageLeft extends Component{

  constructor(porps) {
    super();

  }

  render(){

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT');


   // console.log('deviceHeight: ',deviceHeight);
    //console.log('deviceWidth: ',deviceWidth);




    //console.log('this.props [ at ItemCardImageLeft]: ',this.props );



    //const foodImage = require(this.props.imageLink);
    // console.log('foodImage: ',foodImage);










    const productImage = (
      <View
        style={
          styles.surroundingsOfTheImage

        }>
        <Image
          style={{
            // flex:0.80,
            // borderRadius:14,
            // height: 28,
            // width: 28,

            borderRadius:deviceHeight /(11*2),
            height: deviceHeight / 11,
            width: deviceHeight / 11,

            // borderRadius:deviceHeight * 0.04/2,
            // height: deviceHeight * 0.04,
            // width: deviceWidth * 0.04,

          }}
          // resizeMethod ={'scale'}
          source= {{uri: this.props.imageLink}}
          // source={{uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg'}}


          // source= {foodImage}
        />
      </View>
    );

    return(
      <View style={{
      }}>
        {productImage}
      </View>
    );
  }
}


const styles = StyleSheet.create({

  //ImageStyle: {
  // borderRadius:38,
  // height: 77,
  // width: 77,

  // works need to be done here


  // borderRadius:this.props.deviceHeight * 0.21/2,
  // height: this.props.deviceHeight * 0.21,
  // width: this.props.deviceWidth * 0.21,



  // width: deviceWidth * 0.11,
  // height: deviceHeight * .015,
  // borderRadius:deviceHeight * .015/2,

  // },
  surroundingsOfTheImage:{
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    flex: 0.95,

    flexDirection: 'column',
    justifyContent:'center',
    marginRight:'6%',
    // flex: 1,
    // marginTop:'-5%',
    // marginTop:'3%',
    // left:'-4%'

  },
});


ItemCardImageLeft.propTypes = {
  imageLink: PropTypes.string,
  // color: PropTypes.string,
  // onPress: PropTypes.func.isRequired,
};
ItemCardImageLeft.defaultProps = {

  //deviceWidth: Dimensions.get('window').width,
  //deviceHeight:  Platform.OS === 'ios' ? Dimensions.get('window').height : ExtraDimensions.get('REAL_WINDOW_HEIGHT'),


};

export default ItemCardImageLeft;



