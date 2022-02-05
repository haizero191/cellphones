import {
    ACTION_LOAD_PRODUCT_REQUEST, 
    ACTION_LOAD_PRODUCT_SUCCESS,
    ACTION_REMOVE_PRODUCT
} from "../contants/productConstants";


var initialState = {
    loading: false,
    success: false,
    productData: [

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
                productData: action.payload
            }
        }
        case ACTION_REMOVE_PRODUCT: {
            return state;
        }
        default: 
            return state
    }

}

export default productReducer;