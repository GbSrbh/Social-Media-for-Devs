import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';

import axios from "axios";

//Fetch profile from backend
export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Create Profile
export const createProfile = (formData, edit = false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated Successfully' : 'Profile Created Successfully', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Add Education
export const addEducation = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Your education has been added successfully!!', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { status: err.response.status, msg: err.response.statusText }
    })
  }
}