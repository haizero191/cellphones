import {combineReducers} from "redux";
import productReducer from "./productReducer";
import cateReducer from "./cateReducer";
import brandReducer from "./brandReducer";
import detailReducer from "./detailReducer";

var allReducer = combineReducers({
    products: productReducer,
    details: detailReducer,
    categorys: cateReducer,
    brands: brandReducer
})

export default allReducer;