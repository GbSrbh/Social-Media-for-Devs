import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
//dispatch registeration
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
    const errors = err.response.data.errors;//errors array received from backend (name is required, email min length 6)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}