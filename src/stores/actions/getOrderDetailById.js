import * as types from './types';
import urls from '../url';
// const queryString = require('query-string');
// import qs from 'qs';

import axios from 'axios';
// import { authSuccess } from "./authAction";


export const OrderDetail_fetch_Success = (order_Detail_response_data_Restaurant_Automation) =>
  // authData
  // type:types.AUTH_SUCCESS,
  // authData,

  ({
    type:types.RECEIVED_ORDER_DETAIL,
    order_detail:order_Detail_response_data_Restaurant_Automation,
    // username:initialUsername,

  })
;


export const getOrderDetailById =(orderId,AUTH_TOKEN) => {

  axios.defaults.baseURL = urls.baseUrl;

  axios.defaults.headers.get['Content-Type'] = 'application/json';
  // axios.defaults.headers.common.Authorization = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


    axios.defaults.headers.common['Authorization'] ='Bearer '+ AUTH_TOKEN;


  return dispatch => {
    axios({
      method: 'GET',
      url: 'api/order-masters/'+orderId+'',
    }).then((response) => {
      dispatch(OrderDetail_fetch_Success(response.data));
      //if (response.data.id_token) {
      //  dispatch(authSuccess(response.data.id_token, username));
      //bearer found.
      // }
      // to be tested again
    }).catch((error) => {
      // handle error
      // dispatch(authFail(error));

    }).then(() => {
      // always executed
    });

  };
};



// axios.get('api/authenticate/').then(function (response) {
//   // handle success
// })


