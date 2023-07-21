import axios from 'axios';
//THis is only setting the token in the headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-autherisation-user'] = token;//Set this field in header
  } else {
    delete axios.defaults.headers.common['x-autherisation-user'];
  }
}

export default setAuthToken;