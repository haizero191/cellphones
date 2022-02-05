import BrandAPI from "../../api/brandApi"
import {
    ACTION_LOAD_BRAND_REQUEST,
    ACTION_LOAD_BRAND_SUCCESS,
} from "../contants/brandConstants"


export const loadBrand = () => {
    return async(dispatch) => {
        dispatch({
            type: ACTION_LOAD_BRAND_REQUEST
        })
        var response = await BrandAPI.getAllBrand();
        dispatch({
            type: ACTION_LOAD_BRAND_SUCCESS,
            payload: response
        })
    }
}

export const createBrand = (text) => {
    return async(dispatch) => {
        dispatch({
            type: ACTION_LOAD_BRAND_REQUEST
        })
        var response = await BrandAPI.createBrand(text);
        return response;
    }
}