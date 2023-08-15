import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();//generate random id
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      alertType
    }
  });

  //Remove the alert that we set after 5 seconds.
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
}
