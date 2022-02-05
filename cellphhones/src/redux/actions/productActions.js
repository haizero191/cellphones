import {
    ACTION_LOAD_PRODUCT_REQUEST, 
    ACTION_LOAD_PRODUCT_SUCCESS, 
    ACTION_REMOVE_PRODUCT
} from "../contants/productConstants"
import ProductAPI from "../../api/productAPI";

export const loadProducts = (perpage, page) => {
    return async(dispatch) => {
        try {  
            dispatch({
                type: ACTION_LOAD_PRODUCT_REQUEST 
            })
            var response = await ProductAPI.getProducts(perpage, page);
            console.log(response)
            dispatch({
                type: ACTION_LOAD_PRODUCT_SUCCESS,
                payload: response.data
            })
        }
        catch(err) {
            console.log(err);
        }
    }
}



export const loadDetailProducts = (id) => {
    return async(dispatch) => {
        try {  
            dispatch({
                type: ACTION_LOAD_PRODUCT_REQUEST 
            })
            var response = await ProductAPI.getDetailProduct(id);
            dispatch({
                type: ACTION_LOAD_PRODUCT_SUCCESS,
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


