import {
    ACTION_LOAD_PRODUCT_REQUEST, 
    ACTION_LOAD_PRODUCT_DETAIL_SUCCESS
} from "../contants/productConstants";


var initialState = {
    loading: false,
    success: false,
    resultData: {

    }
}

const detailReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_LOAD_PRODUCT_DETAIL_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                resultData: {...action.payload}
            }
        }
        default: 
            return state
    }

}

export default detailReducer;