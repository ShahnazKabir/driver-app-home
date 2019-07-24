import { combineReducers} from 'redux';
import OrderListReducer from './orderListReducer';
import OrderDetailsReducer from './orderDetailsReducer';
// import LoginReducer from './loginReducer';
import authReducer from './AuthReducer';
// const composeEnhancers =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// import

export default combineReducers({
  orderList: OrderListReducer,
  orderDetail: OrderDetailsReducer,
  // login: LoginReducer,
  auth:authReducer,

});

// orderDetail.orderDetailData