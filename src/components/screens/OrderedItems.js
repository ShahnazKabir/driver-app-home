import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  // Share,
  Platform,
  StatusBar,
  BackHandler, NetInfo
} from "react-native";


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import call from 'react-native-phone-call';
import {HeaderOrderedItems} from "./../views/HeaderOrderedItems";
import { OrderedItemsBody } from "./../views/OrderedItemsBody";
import { OrderedItemsFooter } from "./../views/OrderedItemsFooter";
// import PDFTemplate from './PDFTemplate';
// import Snackbar from "react-native-snackbar";
import Share from "react-native-share";
import moment from 'moment';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from "prop-types";
import * as actions from "./../../stores/actions";
import { connect } from "react-redux";




// eslint-disable-next-line react/prefer-stateless-function
let textPDF ='';

let totalPrice = null;


const customerName ="TestCustomer";
const args = {
  number: '+8801614303606', // String value with the number to call
  prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
};

// testing this
// https://facebook.github.io/react-native/docs/share
const shareingContent = {
  Message: 'test message from developper',
  Title: 'test title from developper',
};


const items = [
  {
    id: 1,
    name: 'Item 1',
    price: 20,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'http://globalfashionstreet.com/wp-content/uploads/2015/10/samosa.jpg',
  },
  {
    id: 2,
    name: 'Item 2',
    price: 30,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'https://cdn7.newsnation.in/images/2017/06/16/878609020-frenchfries_6.jpg',
  },
  {
    id: 3,
    name: 'Item 3',
    price: 24,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'https://5.imimg.com/data5/KH/TW/MY-9134447/big-cone-ice-cream-500x500.jpg',

  },
  {
    id: 4,
    name: 'Item 4',
    price: 20,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'https://static01.nyt.com/images/2009/08/13/health/burger_480.jpg',
  },
  {
    id: 5,
    name: 'Item 5',
    price: 30,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'https://www.eatthis.com/wp-content/uploads/2017/12/burger-king-whopper-facebook-500x365.jpg',
  },
  {
    id: 6,
    name: 'Item 6',
    price: 24,
    ingredients: 'ingredient 1,ingredient 2 , ingredient 3',
    imageLink:'http://ksmartstatic.sify.com/cmf-1.0.0/appflow/bawarchi.com/Image/oesayLabdchfh_bigger.jpg',
  },

];
let allItems ='';

items.map((oneItem, index) => {

  allItems = allItems + `<div class="div-table-unit-price">
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #212E3E; font-size:14px">`+ oneItem.name + `</span></div>
    <div  class="div-table-col-3rd"><span style="color: #212E3E; font-size:14px">`+oneItem.price+` €</span></div>
  </div>
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #212E3E; font-size:12px">`+ oneItem.ingredients +`</span></div>
  </div>
</div>`;

  totalPrice += oneItem.price;
});

const totalAndFooter=`<div class="div-table-total-price">
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #A7A5A5;font-size: 16px">Total</span></div>
    <div  class="div-table-col-3rd"><span style="color: #A7A5A5;font-size: 16px">`+ totalPrice +` €</span></div>
  </div>
</div>
<hr style="color: #707070;margin-left: 3cm;margin-right:3cm">
</body>
</html>`;



textPDF =`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PDFShare</title>
  <style
  >
    body{
      background-color: #F5F6F8;
      width: 14.8cm;
      height: 21.0cm;
      margin: 0 auto;
      /*maybe this margin one is good for multiple pages*/
      /*margin: 30mm 45mm 30mm 45mm;*/
      /* change the margins as you want them to be. */
    }
    /*All Things related to Table and its columns and rows*/
    .div-table {
      margin-left: 3cm;
      display: table;
      width: auto;
      /*background-color: #eee;*/
      /*border: 1px solid #666666;*/
    // border-spacing: 5px; /* cellspacing:poor IE support for  this */
      margin-top: 5%;
    }
    .div-table-unit-price{
      margin-left: 3cm;
      display: table;
      width: auto;
      /*background-color: #eee;*/
      /*border: 1px solid #666666;*/
    // border-spacing: 5px; /* cellspacing:poor IE support for  this */
      margin-top: 2%;
    }
    .div-table-total-price{
      margin-left: 3cm;
      display: table;
      width: auto;
      /*background-color: #eee;*/
      /*border: 1px solid #666666;*/
    // border-spacing: 5px; /* cellspacing:poor IE support for  this */
      margin-top: 3%;
    }
    .div-table-row {
      display: table-row;
      /*width: auto;*/
      width: auto;
      /*width: auto;*/
      clear: both;
      float: left;
      /*margin-right: 1cm;*/
    }
    .div-table-col {
      float: left;
      /* fix for  buggy browsers */
      display: table-column;
      width: 200px;
      /*background-color: #ccc;*/
    }
    .div-table-col-2nd{
      float: left;
      /* fix for  buggy browsers */
      display: table-column;
      width: 200px;
      margin-left: 1cm;
      /*background-color: #ccc;*/
    }
    .div-table-col-3rd{
      float: left;
      /* fix for  buggy browsers */
      display: table-column;
      width: 200px;
      margin-left: 1cm;
      /*background-color: #ccc;*/
    }
    /*All Things related to Table and its columns and rows*/
  </style>
</head>
<body>
<div class="div-table">
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #A7A5A5;font-size: 16px">Restaurant name</span></div>
    <div  class="div-table-col-2nd"><span style="color: #707070;font-size: 16px">Delivery Date</span></div>
  </div>
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #A7A5A5">Order Number 1234</span></div>
    <div  class="div-table-col-2nd"><span style="color: #707070;font-size: 16px">Delivery Time</span></div>
  </div>
</div>
<div style="margin-left: 3cm;margin-top: 0.7cm;">
  <span style="color: #707070;display: block;font-size: small">Address</span>
  <span style="color: #707070;font-size: small">Phone Number</span>
</div>
<!--Items div starts here-->
<div class="div-table">
  <div class="div-table-row">
    <div class="div-table-col" align="left"><span style="color: #A7A5A5; font-size:16px">Items</span></div>
    <div  class="div-table-col-3rd"><span style="color: #707070; font-size:16px">Price</span></div>
  </div>
</div>
<hr style="color: #707070;margin-left: 3cm;margin-right:3cm">
<!--Items div ends here-->
<!--Total starts here-->
` + allItems + totalAndFooter ;


// Create a new PDF in your app's private Documents directory
let oneOrderId =9852;
class OrderedItems extends Component {

  constructor(porps) {
    super();
    // props

    this.state = {
      ShareButtonColor:'grey',
      UnpaidIconColor:'red',
      CardIconColor:'grey',
      CashIconColor:'grey',
      call_Client_Color:'#008AF3',
      check_out_Color:'#008AF3',
      // curTime:null,
    };
  }

  static navigationOptions = {
    header: null,

  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => true
  // handleBackButtonClick = () => false
  // Returning true from onBackButtonPressAndroid denotes that we have
  // handled the event, and react-navigation's listener will not get called,' +
  // ' thus not popping the screen. Returning false will cause the event to ' +
  // 'bubble up and react-navigation's listener will pop the screen.


  componentDidMount() {

    // http://18.223.117.205:8080/api/order-masters/9852
    this.props.getOrderDetailById(oneOrderId,this.props.token);
    // this._navListener = this.props.navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle('light-content');
    //   isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    // });
  }

  onShare = async (path) => {
    const url= 'file://'+path+'';
    const shareOptions = {
      title: 'Food Items delivered list',
      subject: 'Food Items delivered list',
      message:'Hi, Here are the items in PDF format, please check.',
      type: 'application/pdf',
      url,
    };
    return await Share.open(shareOptions).then((res) => {
      this.setState({
        ShareButtonColor:'deepskyblue',
      });
    })
      .catch((err) => {
        err && console.log('Error IS: ',err);


      });
  };




  createPDF = async () => {

    // var moment = require('moment');

    const now = moment();

    // let curTime : new Date().toLocaleString();

    // console.log(curTime,curTime);

    const deliveryTime= now.toLocaleString();
    // const then = moment(notice.createdAt);
    // moment().format();
    // var now = moment().format('D-MMM-YY HH-mm');
    const options = {
      html: textPDF,
      fileName: customerName +'_' +deliveryTime,
      directory: 'Documents',
    };
    const file = await RNHTMLtoPDF.convert(options);
    // if (file ! undefined)
    if(((!file) || !typeof (file))){
    }
    // File Seeker comes here
    else{
      // let quotedFilePath= ''
      this.onShare(file.filePath);

    }
  };

  _onPressButtonShareDetails = async ()=>{
    this.createPDF();
    // return this.props.navigation.navigate('ShareTest')

  };
  _onPressButtonTouch_APP=()=>{
    this.setState({
      UnpaidIconColor: 'red',
      CardIconColor: 'grey',
      CashIconColor: 'grey',
    });

  };

  _onPressButtonCard=()=>{
    this.setState({
      UnpaidIconColor:'grey',
      CardIconColor:'blue',
      CashIconColor:'grey',
    });
  };

  _onPressButtonCash=()=>{

    this.setState({
      UnpaidIconColor:'grey',
      CardIconColor:'grey',
      CashIconColor:'blue',
    });
  };


  _onPressButtonCall_Client=()=>{
    this.setState({
      call_Client_Color:'blue',
    });
    // Linking.openURL(`tel:${+8801614303606}`);
    call(args).catch(console.error);
  };
  _onPressButtonCheck_Out=()=>{
    // no need

    this.setState({
      check_out_Color:'blue',
    });


    return this.props.navigation.navigate('OrderList');



    // for safe keeping might be needed for future still on test.
    /*
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        NavigationActions.navigate({ routeName: 'OrderList' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
*/

  };
  componentDidUpdate(prevProps, prevState, snapshot){
    // commented today for logout test.
    if ((this.props.order!== prevProps.order)) {
      //this.props.navigation.navigate('OrderList');
    }
  }

  render() {
    const { navigation } = this.props;

    let totalPrice = null;
    items.map((oneItem, index) => {
      totalPrice += oneItem.price;
    });

    const HomeCards = [];
    const id = navigation.getParam('orderId', '1');
    return (

      <View style={styles.container}>
        <StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content'/>
        {/*<KeyboardAwareScrollView>*/}

        <HeaderOrderedItems
          totalPrice={totalPrice}
          color={this.state.ShareButtonColor}
          onPress={this._onPressButtonShareDetails}
        />

        {/*</KeyboardAwareScrollView>*/}
        {/*start of action buttons*/}

        <OrderedItemsBody
          items={items}
          unpaidButtonColor={this.state.UnpaidIconColor}
          cashButtonColor={this.state.CashIconColor}
          cardButtonColor={this.state.CardIconColor}
          unpaidButtonPress={this._onPressButtonTouch_APP}
          cardButtonPress={this._onPressButtonCard}
          cashButtonPress={this._onPressButtonCash}
        />


        <OrderedItemsFooter
          callButtonColor={this.state.call_Client_Color}
          checkOutButtonColor={this.state.check_out_Color}
          callButtonPress={this._onPressButtonCall_Client}
          checkoutButtonPress={this._onPressButtonCheck_Out}

        />

      </View>
    );
    // }

  }

}


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    // backgroundColor:'cornsilk',
    flex: 1,
  },
});


OrderedItems.propTypes = {
  order:PropTypes.object,
  navigation: PropTypes.object,
  getOrderDetailById: PropTypes.func.isRequired,
  token: PropTypes.string,
};


const mapStateToProps = state =>
  // console.log('State returned at mapStateToProps: ',state);
  ({
    order:state.orderDetail.orderDetailData,
    //order:state.orderDetail.orders,
    loading:state.orderDetail.loading,
    error: state.orderDetail.error,
    token: state.auth.token,
  });


const  mapDispatchToProps = dispatch  =>
  // console.log('state at mapDispatchToProps');
  (
    {
      // hits actions.authAction
      getOrderDetailById:(oneOrderId,token)=> dispatch(actions.getOrderDetailById(oneOrderId,token)),
      // onAuth:  (username,password) => dispatch(actions.authAction(username,password)),
      // clearAuthStore:() => dispatch(actions.clearAuthStore()),
      // clearAuthStore:( username, password,loading) => dispatch(actions.clearAuthStore(username, password,loading)),

      // onLogout: () => dispatch(actions.LogoutFromApplication()),

      // listData: state.orderList,
    }
  );



export default connect(mapStateToProps,
  mapDispatchToProps
)(OrderedItems);
// export default connect(this.state,

// export default LoginScreen;
