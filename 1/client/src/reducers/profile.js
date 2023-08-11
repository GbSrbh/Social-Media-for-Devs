import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_EDUCATION,
  UPDATE_PROFILE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
}

export default function profile(state = initialState, action) {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: null,
      }
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      }
    default:
      return state;
  }
}