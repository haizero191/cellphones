import {createStore, applyMiddleware} from "redux";
import allReducer from "./reducers";
import thunk from 'redux-thunk';

var store = createStore(allReducer,applyMiddleware(thunk))

store.dispatch({
    type: "ACTION_LOAD_PRODUCT",
    payload: [1,2,3,4]
})
export default store;