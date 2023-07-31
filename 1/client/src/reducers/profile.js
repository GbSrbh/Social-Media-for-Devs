import {
  GET_PROFILE,
  PROFILE_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  errors: {}
}

export default function profile(state = initialState, action) {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case GET_PROFILE:
      console.log(payload);
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