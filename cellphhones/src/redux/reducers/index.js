import {combineReducers} from "redux";
import productReducer from "./productReducer";
import cateReducer from "./cateReducer";
import brandReducer from "./brandReducer";

console.log(productReducer)
var allReducer = combineReducers({
    products: productReducer,
    categorys: cateReducer,
    brands: brandReducer
})

export default allReducer;