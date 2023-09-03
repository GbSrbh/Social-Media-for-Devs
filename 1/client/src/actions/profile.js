import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  SET_SKILLS,
  GET_GITHUB_REPOS,
  GET_PROFILE_BY_ID,
  REMOVE_PROFILE_BY_ID
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

//Add Experience
export const addExperience = (formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Your experience has been added successfully', 'success'));

  } catch (err) {

    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education was removed.', 'success'));

  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })

  }
}

//Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience was removed.', 'success'));

  } catch (err) {

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })

  }
}

//Delete Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be UNDONE!!')) {
    try {
      await axios.delete('/api/profile/');

      dispatch({
        type: ACCOUNT_DELETED
      })
      dispatch({
        type: CLEAR_PROFILE
      })

      dispatch(setAlert("Your account has been premanently deleted"));

    } catch (err) {

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      })
    }

  }
}

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: REMOVE_PROFILE_BY_ID });
  try {
    const res = await axios.get('/api/profile');

    dispatch({//This dispatch is causing the issue, if I remove this and then console log the res data, I cann see the skills there
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })

  }
}

//Set Skills by Getting all profiles
export const setSkills = () => async (dispatch) => {

  try {
    const res = await axios.get('/api/profile');
    const skillArray = [];
    res.data.forEach((item) => skillArray.push(item.skills));
    // await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch({
      type: SET_SKILLS,
      payload: skillArray
    })

  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })

  }
}

//Get profile by user id
export const getProfileById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Get Githubrepos by usernam
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_GITHUB_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}