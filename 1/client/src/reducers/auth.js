//Register a user
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function auth(state = initialState, action) {
  
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS://On successfull registeration.
    case LOGIN_SUCCESS://On successfull login.
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL://On failure in registeration.
    case AUTH_ERROR://Same for auth error
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated:false,
        loading: false
      }
    default:
      return state;
  }

}