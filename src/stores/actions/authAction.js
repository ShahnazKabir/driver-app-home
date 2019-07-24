import * as types from './types';
import urls from '../url';
import axios from 'axios';


export const authStart = () => ({
    type:types.AUTH_START,
  });

export const authSuccess = (responseToken,initialUsername) => 
  // authData
  // type:types.AUTH_SUCCESS,
  // authData,

  ({
    type:types.AUTH_SUCCESS,
    token:responseToken,
    username:initialUsername,

  })
;

export const authFail = (generatedError) => ({
    type: types.AUTH_FAIL,
    error:generatedError,
  });

// export const logout = () => ({
//     type: types.AUTH_LOGOUT,
//   });


export const reinitiateAuthStore = () => ({
    type: types.CLEAR_TO_INITIAL,
  });



export const clearAuthStore =()=>
   dispatch => {
    dispatch(reinitiateAuthStore());
  }
  // dispatch(authStart());
  // dispatch(authFail(error));
;

// export const LogoutFromApplication =()=>dispatch => {
//     dispatch(logout());
//   };


export const reinstate_to_AuthStore = (cookieUsername, cookiePassword, cookieTtoken) => ({
  type: types.REINSTATE_TO_AUTHSTORE,
  token:cookieTtoken,
  username:cookieUsername,
  password:cookiePassword,
});

export const cookieToStore =(username, password, token) =>
  dispatch => {
    dispatch(reinstate_to_AuthStore(username, password, token));
  };



// From LoginScreen's this line onAuth:  (username,password) => dispatch(actions.authAction(username,password)),'
export const authAction =(username, password) => {

  axios.defaults.baseURL = urls.baseUrl;

  axios.defaults.headers.post['Content-Type'] = 'application/json';

  //Get bearer
  return dispatch => {
    dispatch(authStart());

    const authdata = {
      username,
      password,
      'rememberMe': true,
    };


    axios({
      method: 'POST',
      url: 'api/authenticate',
      data: authdata,
    }).then((response) => {

      if (response.data.id_token) {


        dispatch(authSuccess(response.data.id_token, username));

        //bearer found.

      }


      // to be tested again
    }).catch((error) => {
      // handle error
      //console.log('error: ', error);
      dispatch(authFail(error));

    }).then(() => {
      //console.log('Finally');
      // always executed
    });

  };
};



// axios.get('api/authenticate/').then(function (response) {
//   // handle success
// })


