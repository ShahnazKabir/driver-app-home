// export default () => [];

import * as types from './../actions/types';
import {updateObject} from './../utility';
import { ORDER_LIST } from "./../actions/types";

// const initialState={
//
//   address: null,
//   id: null,
//   mobileNo: null,
//   orderBy: null,
//
//   orderDate: null,
//   orderDetails: null,
//   orderId: null,
//   orderTime: null,
//
//
//   // orderType is object
//   orderType: null,
//   // paymentMethod is object
//   paymentMethod: null,
//   paymentStatus: null,
//   status: null,
//
//   warningTime:null,
//   type:null,
// };


const initialState={
  orderedItems: [], // orderDetailData
  loading:false,

};
//
// export default function listReducer(state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case ORDER_LIST:
//       return {...state, orderListData : action.payload};


const received_order_detail =(state=initialState, action) =>{

  const orderedItems={
    ...action.order_detail,
    id:action.order_detail.id,
  };


  // return updateObject(state,{
   // data: action,
    // username: action.username,
    // error:null,
    // loading:false,

   // address: null,
   // id: null,
   // mobileNo: null,
   // orderBy: null,

   // orderDate: null,
   // orderDetails: null,
   // orderId: null,
   // orderTime: null,


    // orderType is object
   // orderType: null,
    // paymentMethod is object
    //paymentMethod: null,
    //paymentStatus: null,
   // status: null,

   // warningTime:null,
   // type:null,
 // });

  //console.log()
  return {
    ...state,
    loading: false,
    orderDetailData : orderedItems,
    error:false,
  };
};

const orderDetailsReducer =(state = initialState, action)=>
{
  switch (action.type) {
    case types.RECEIVED_ORDER_DETAIL:return received_order_detail(state,action);
    // case types.AUTH_SUCCESS: return authSuccess(state,action);
    // case types.AUTH_FAIL: return authFail(state,action);
    // case types.CLEAR_TO_INITIAL: return clearToInitial (initialState,action);
    // case types.AUTH_LOGOUT: return authLogout (state,action);

    default:
      return state; //We return the previous state in the default case. It's important to return the previous state for any unknown action.
  }
};

export default orderDetailsReducer;
