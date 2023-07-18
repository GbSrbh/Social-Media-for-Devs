import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-autherisation-user'] = token;//Set this field in header
  } else {
    delete axios.defaults.headers.common['x-autherisation-user'];
  }
}

export default setAuthToken;