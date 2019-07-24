import React, { Component } from 'react';
import {Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ItemCardImageLeft} from '../images/ItemCardImageLeft';
import PropTypes from 'prop-types';
import { OrderedItemsBody } from '../views/OrderedItemsBody';

// WithCenterdText
// export default




export class ItemsCard extends React.PureComponent{
  // constructor(props) {
  //     super(props);
  // }

  _renderItem = item => {
    // const { width, height } = this.state;

    const MonetaryUnitLogo ='logo-euro';
    const ItemsCard = [];
    const totalPrice = 0;

    const MonetaryUnitSmall= (<Ionicons style={{fontWeight: '10'}}
                                        name={MonetaryUnitLogo}
                                        size={12}
                                        color="#FF6969"
    />);


    const props = { ...item.item };


    return (
      <View
        key={props.id}
        id={props.id}
        style={
          // move it the Bottom of code
          styles.singleItemStyleBottomBorder}>
        <ItemCardImageLeft
          imageLink={props.imageLink}
        />
        <View style={
          // move the style
          styles.oneRowItemsTextStyle
        } >
          <View>
            <Text
              style={
                // move to fonts folder
                styles.itemNameTextStyle
              }
            >
              {props.name}
            </Text>
          </View>
          <View>
            <Text
              style={ // move to the fonts

                styles.itemIngredientStyle
              }
            >
              {props.ingredients}
            </Text>
          </View>
          <View>
            <Text
              style={ // move to the fonts
                styles.redPriceTextStyle
              }
            >
              {props.price}
              {' '}
              {MonetaryUnitSmall}
            </Text>
          </View>

        </View>

      </View>








    );
  };

  _keyExtractor = (item, index) => item.id.toString();

  render(){

    return (
      <View
        style=
          {
            styles.orderCardsWrapperStyle
          }
      >

        <FlatList

          data={this.props.items}
          keyExtractor={this._keyExtractor}
          // data={[{key: 'a'}, {key: 'b'}]}
          renderItem={this._renderItem}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({

  itemIngredientStyle:{
    fontSize:13,
  },
  itemNameTextStyle:{
    fontSize:20,
    fontWeight:'bold',
  },
  oneRowItemsTextStyle:{
    alignContent:'space-between',
    alignSelf:'center',
    flexDirection: 'column',
    justifyContent:'space-between',
    paddingBottom:'3.5%',
    paddingTop:'3.5%',
    textAlign:'left',
    // marginTop:'-5%',
  },
  orderCardsWrapperStyle:{
    // marginHorizontal: 12,
    flex:3.8,
    flexDirection:'column',
    // marginTop:'2%',

  },
  redPriceTextStyle:{
    color:'#FF6969',
    fontSize:13,
  },
  singleItemStyleBottomBorder:{
    borderBottomColor:'dimgrey',
    borderBottomWidth:StyleSheet.hairlineWidth,
    flex:0.95,
    flexDirection:'row',
    // marginLeft:'3%',
    marginHorizontal:'4%',
    paddingBottom:'3.5%',
    paddingTop:'1.5%',

  },

});


ItemsCard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.string,
    imageLink:PropTypes.string,
  })),

};
ItemsCard.defaultProps = {

};




