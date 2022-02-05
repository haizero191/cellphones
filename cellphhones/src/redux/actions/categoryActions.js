import CategoryAPI from "../../api/categoryAPI"
import {
    ACTION_LOAD_CATE_REQUEST,
    ACTION_LOAD_CATE_SUCCESS,
    ACTION_REMOVE_CATE,
    ACTION_CREATE_CATE_SUCCESS
} from "../contants/cateConstants"


export const loadCate = () => {
    return async(dispatch) => {
        dispatch({
            type: ACTION_LOAD_CATE_REQUEST
        })
        var response = await CategoryAPI.getAllCate();
        dispatch({
            type: ACTION_LOAD_CATE_SUCCESS,
            payload: response
        })
    }
}

export const createCate = (text) => {
    return async(dispatch) => {
        dispatch({
            type: ACTION_LOAD_CATE_REQUEST
        })
        var response = await CategoryAPI.createCate(text);
        return response;
    }
}