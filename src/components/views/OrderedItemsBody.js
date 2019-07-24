import React, { Component } from "react";
import { StyleSheet, View} from "react-native";
import { UnpaidButton } from "../buttons/UnpaidButton";
import { CardButton } from "../buttons/CardButton";
import { CashButton } from "../buttons/CashButton";
import { ItemsCard } from "../cards/ItemsCard";
import PropTypes from "prop-types";
// import LoginButton from "../buttons/LoginButton";
// import { HorizontalActionButtonsInBody } from "./HorizontalActionButtonsInBody";


// WithCenterdText
// export default



export class OrderedItemsBody extends Component {

  // constructor(props) {
  //   super(props);
  // }
  render() {


    return(
      <>
        <View style={styles.FinalBottomLine
          //depends on nested components height
          // <ItemsCard we have 0.8 X 3 = 2.4 as flex height.
        }>
          {/*<FinalBottomLine>*/}
          <ItemsCard
            items={this.props.items}
          />
          {/*<HorizontalActionButtonsInBody*/}

          {/*CardButtonColor={this.props.cardButtonColor}*/}
          {/*CashButtonColor={this.props.cashButtonColor}*/}
          {/*UnpaidButtonColor={this.props.unpaidButtonColor}*/}
          {/*CardButtonPress={this.props.cardButtonPress}*/}
          {/*CashButtonPress={this.props.cashButtonPress}*/}
          {/*UnpaidButtonPress={this.props.unpaidButtonPress}*/}

          {/*/>*/}

          {/*------------------*/}

          {/*This one works too*/}

          {/*------------------*/}

          <View style={
            styles.HorijontalButtonsRow}>

            <View style={{marginHorizontal:30}}>
              <UnpaidButton
                color={this.props.unpaidButtonColor}
                onPress={this.props.unpaidButtonPress}
              />
            </View>

            <View style={{marginHorizontal:30}}>
              <CardButton
                color={this.props.cardButtonColor}
                onPress={this.props.cardButtonPress}
              />
            </View>

            <View style={{marginHorizontal:30}}>
              <CashButton
                color={this.props.cashButtonColor}
                onPress={this.props.cashButtonPress}
              />
            </View>
          </View>
        </View>
        {/*</FinalBottomLine>*/}

      </>
    );
  }
}


const styles = StyleSheet.create({
  FinalBottomLine:{
    borderBottomColor:'dimgrey',
    borderBottomWidth:StyleSheet.hairlineWidth,
    flex:3.8,
    // flexDirection:'row',
    // marginHorizontal:'4%',
    marginLeft:'3%',
    // paddingBottom:'3.5%',
    // paddingTop:'1.5%',
  },
  HorijontalButtonsRow:{
    alignItems:'center',
    // this style puts them in the center middle , column wise
    // alignItems:'flex-start',
    // backgroundColor:'cornsilk',
    // backgroundColor:'#FFFFFF',
    // backgroundColor:'#EDF3FF',




    borderBottomColor:'dimgrey',
    borderBottomWidth:StyleSheet.hairlineWidth,
    // borderTopColor:'dimgrey',
    // borderTopWidth:StyleSheet.hairlineWidth,
    flex:1.2,
    flexDirection:'row',
    justifyContent:'center',
    // marginTop:'2%',
    paddingTop: '1%',
  },
});


OrderedItemsBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.string,
    imageLink:PropTypes.string,
  })),

  // color of buttons
  unpaidButtonColor:PropTypes.string,
  cashButtonColor:PropTypes.string,
  cardButtonColor:PropTypes.string,
  // button Press Actions
  cashButtonPress:PropTypes.func.isRequired,
  cardButtonPress:PropTypes.func.isRequired,
  unpaidButtonPress:PropTypes.func.isRequired,
  // onPress: PropTypes.func.isRequired,
};
OrderedItemsBody.defaultProps = {

};


