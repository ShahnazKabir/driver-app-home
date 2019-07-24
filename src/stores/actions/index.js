import {
  ORDER_LIST,
  ERROR,
  ORDER_OBJECT_SET,
} from './types';
import urls from './../url';
import NetworkClient from './../networkClient';

const fetchList = (dispatch, orders) => {
  dispatch({
    type: ORDER_LIST,
    payload: orders,
  });
};

const setError = (dispatch, error) => {
  dispatch({
    type: ERROR,
    payload: error,
  });
};

export const setOrderData = (dispatch, orderObj) => {
  dispatch({
    type: ORDER_OBJECT_SET,
    payload: orderObj,
  });
}

export const getOrderList = () => (dispatch) => NetworkClient.get(urls.orderListUrl)
      .then(response => {
        // console.log(response);
        fetchList(dispatch, response.data);
      })
      .catch(error => {
        setError(dispatch, error.response.data.status);
      });

export const driverStatus = (orderId, status) => (dispatch) => NetworkClient.get(urls.orderListUrl)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

export const driverLocationUpdate = (orderId, orderData) => (dispatch) => NetworkClient.put(urls.orderListUrl, orderData)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

export {
  authAction,
  clearAuthStore,
  cookieToStore,
} from './authAction';


export {
  getOrderDetailById,
}from './getOrderDetailById';
