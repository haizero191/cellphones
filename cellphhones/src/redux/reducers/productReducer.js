import {
    ACTION_LOAD_PRODUCT_REQUEST, 
    ACTION_LOAD_PRODUCT_SUCCESS,
    ACTION_REMOVE_PRODUCT,
    ACTION_LOAD_PRODUCT_DETAIL_REQUEST,
    ACTION_LOAD_PRODUCT_DETAIL_SUCCESS
} from "../contants/productConstants";


var initialState = {
    loading: false,
    success: false,
    resultData: [

    ]
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_LOAD_PRODUCT_REQUEST: {
            return {...state,
                loading: true,
            }
        }
        case ACTION_LOAD_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                resultData: action.payload
            }
        }
        case ACTION_REMOVE_PRODUCT: {
            return {
                ...state,
                loading: false,
                success: true
            };
        }
        case ACTION_LOAD_PRODUCT_DETAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true
            }
        }
        default: 
            return state
    }

}

export default productReducer;