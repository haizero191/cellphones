import {createStore, applyMiddleware} from "redux";
import allReducer from "./reducers";
import thunk from 'redux-thunk';

var store = createStore(allReducer,applyMiddleware(thunk))
export default store;