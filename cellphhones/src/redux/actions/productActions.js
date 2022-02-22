import {
    ACTION_LOAD_PRODUCT_REQUEST, 
    ACTION_LOAD_PRODUCT_SUCCESS, 
    ACTION_REMOVE_PRODUCT,
    ACTION_LOAD_PRODUCT_DETAIL_SUCCESS
} from "../contants/productConstants"
import ProductAPI from "../../api/productAPI";

export const loadProducts = (productData, page) => {
    return async(dispatch) => {
        try {  
            dispatch({
                type: ACTION_LOAD_PRODUCT_REQUEST 
            })
            var response = await ProductAPI.searchProducts(productData, page);
            dispatch({
                type: ACTION_LOAD_PRODUCT_SUCCESS,
                payload: response
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}



export const loadDetailProduct = (id) => {
    return async(dispatch) => {
        try {  
            dispatch({
                type: ACTION_LOAD_PRODUCT_REQUEST 
            })
            var response = await ProductAPI.getDetailProduct(id);
            dispatch({
                type: ACTION_LOAD_PRODUCT_DETAIL_SUCCESS,
                payload: response.data
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}


export const removeProduct = (id) => {
    return async(dispatch) => {
        try {  
            dispatch({
                type: ACTION_LOAD_PRODUCT_REQUEST 
            })
            await ProductAPI.removeProduct(id);       
            dispatch({
                type: ACTION_REMOVE_PRODUCT
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}

export const createProduct = (productData) => {
    return async(dispatch) => {
        var response = await ProductAPI.createProduct(productData);
        return response;
    }
}


