import {
  ORDER_LIST,
  ERROR,
  LOGIN, ORDER_OBJECT_SET
} from "../actions/types";


const INITIAL_STATE = {
  orderListData: [],
  errorMsg : '',
  orderObj: '',
}

export default function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_LIST:
      return {...state, orderListData : action.payload};
    case ORDER_OBJECT_SET:
      return {...state, orderObj: action.payload};
    case ERROR:
      return {...state, errorMsg: action.payload};
    // case LOGIN:
    //   return action.posts;
    default:
      return state;
  }
}