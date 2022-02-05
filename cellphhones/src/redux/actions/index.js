import {
    loadProducts,
    removeProduct, 
    createProduct
} from "./productActions";

import {
    loadCate,
    createCate
} from "./categoryActions";

import {
    loadBrand,
    createBrand
} from "./brandActions";

const combineAction = {
    loadProducts, 
    removeProduct, 
    createProduct, 
    loadCate, 
    createCate, 
    loadBrand, 
    createBrand
}


const actionCreator = combineAction;


export default actionCreator;