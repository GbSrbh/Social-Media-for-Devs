import axios from 'axios';
import { GET_POSTS, POSTS_ERROR } from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('./api/post/');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })

  }
} 
