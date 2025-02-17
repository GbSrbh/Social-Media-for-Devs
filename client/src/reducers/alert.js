import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
const initialState = [];

function alert(state = initialState, action) {
  //we will send the action's payload and type with the action and alert's payload will look something like this
  // {
  //   id: 1,
  //   msg: 'Please Log in',
  //   alertType: 'success' //this is not the action.type
  // }
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];//add action.payload to the state array
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== action.payload);//Remove alert with id passed in payload  
    default:
      return state;
  }

}

export default alert;