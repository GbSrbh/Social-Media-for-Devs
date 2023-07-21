import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL
} from './types';

import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Load user if token is present in the local storage
export const loadUser = () => async dispatch => {
  if (localStorage.token) {//If token is present in localstorage, set the header.
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');//Successfully recieve user if token is there. Else catch error.

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//dispatch registeration to the backend and then to reducer for successfull or failed registeration.
export const register = (props) => async dispatch => {  //Props are name, email, password

  const config = {//Setting header for sending json in body
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = {//Post request will contain this body
    "name": props.name,
    "email": props.email,
    "password": props.password
  }

  try {
    const res = await axios.post('/api/users', body, config);//failure in this would result in catch statement
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data//token received from backend
    })
  } catch (err) {
    const errors = err.response.data.errors;//errors array received from backend (name required, valid email..)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//Send post api request to '/api/auth' for login user and then to reducer for successfull or failed Login
export const login = (props) => dispatch => {//Props would have email and password

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = {
    "email": props.email,
    "password": props.password
  }

  try {
    const res = axios.post('api/auth', body, config);//Login route
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

  } catch (err) {
    const errors = res.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }


} 