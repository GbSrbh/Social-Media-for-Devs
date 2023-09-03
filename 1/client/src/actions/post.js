import axios from 'axios';
import { GET_POSTS, POSTS_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST } from './types';
import { setAlert } from './alert';

//Get all posts from the database
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

//Like a post
export const addLike = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/post/like/${post_id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Remove like from a post
export const removeLike = post_id => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = post_id => async (dispatch) => {
  if (window.confirm('Are u sure u want to delete the post?')) {
    try {
      await axios.delete(`/api/post/${post_id}`);

      dispatch({
        type: DELETE_POST,
        payload: post_id
      });

      dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POSTS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('api/post/', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

