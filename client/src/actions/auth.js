import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
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
    const res = await axios.get('/api/auth');//Successfully recieve user if token is there in the header. Else catch error.
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
    dispatch(loadUser());//Set the token in headers and load user using that token
    dispatch(setAlert("Account created successfully", "success"));
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
export const login = (props) => async dispatch => {//Props would have email and password

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
    const res = await axios.post('api/auth', body, config);//Login route
    dispatch({//Disoatch if no errors are sent in backend.
      type: LOGIN_SUCCESS,
      payload: res.data//Response would be token
    })
    dispatch(loadUser());//Also load the user once the token is in the local storage.
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }

}

export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  })
  dispatch({
    type: LOGOUT
  })
}