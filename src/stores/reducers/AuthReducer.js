import * as types from './../actions/types';
import {updateObject} from './../utility';

const initialState={
  token: null,
  username: null,
  error: null,
  loading: false,
};

const authStart =(state,action) =>{
  return updateObject (state,{error:null,loading:true});
};

const authSuccess =(state,action) =>{
  return updateObject(state,{
    token: action.token,
    username: action.username,
    error:null,
    loading:false,
  });

};


const REINSTATE_TO_AUTHSTORE_FROM_LOCAL_STORAGE =(state,action) =>{
  return updateObject(state,{
    token: action.token,
    username: action.username,
    error:null,
    loading:false,
  });

};



const authFail = (state,action)=>{
  return updateObject(state,{
    error:action.error,
    loading:false,
  });
};

const  authLogout =(state,action)=>{
  return updateObject(state,
    {
      token:null,
      username:null});
};

const clearToInitial = (state,action)=>{

  return updateObject(state,{
    error:null,
    loading:false,
    token:null,
    username:null,
  });
};

const AuthReducer =(state = initialState, action)=>
{
  switch (action.type) {
    case types.AUTH_START:return authStart(state,action);
    case types.AUTH_SUCCESS: return authSuccess(state,action);
    case types.AUTH_FAIL: return authFail(state,action);
    case types.CLEAR_TO_INITIAL: return clearToInitial (initialState,action);
    case types.AUTH_LOGOUT: return authLogout (state,action);
    case types.REINSTATE_TO_AUTHSTORE: return REINSTATE_TO_AUTHSTORE_FROM_LOCAL_STORAGE(state,action);

    default:
      return state;
  }
};

export default AuthReducer;
