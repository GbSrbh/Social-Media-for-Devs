import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  SET_SKILLS,
  GET_GITHUB_REPOS,
  GET_PROFILE_BY_ID,
  REMOVE_PROFILE_BY_ID
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  profileById: null,
  repos: [],
  loading: true,
  errors: {},
  skillsArray: null
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
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      }
    case SET_SKILLS:
      return {
        ...state,
        skillsArray: payload,
        loading: false
      }
    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      }
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profileById: payload,
        loading: false
      }
    case REMOVE_PROFILE_BY_ID:
      return {
        ...state,
        profileById: null
      }
    default:
      return state;
  }
}