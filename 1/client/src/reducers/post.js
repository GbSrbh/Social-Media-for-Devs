import {
  DELETE_POST,
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  UPDATE_COMMENT,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: null
}
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => post._id === payload.post_id ? { ...post, likes: payload.likes } : post),
        loading: false,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload }
      }
    default:
      return state;
  }
}