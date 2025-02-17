import { legacy_createStore as createStore, applyMiddleware } from 'redux'; //createStore is depricated thus use legacy
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;

