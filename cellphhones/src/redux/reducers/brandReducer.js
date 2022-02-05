import {
    ACTION_LOAD_BRAND_REQUEST, 
    ACTION_LOAD_BRAND_SUCCESS,
    ACTION_CREATE_BRAND_SUCCESS
} from "../contants/brandConstants";


var initialState = {
    loading: false,
    success: false,
    resultData: [

    ]
}

const brandReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_LOAD_BRAND_REQUEST: {
            return {...state,
                loading: true,
            }
        }
        case ACTION_LOAD_BRAND_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                resultData: action.payload
            }
        }
        case ACTION_CREATE_BRAND_SUCCESS:{
            return state
        }
        default: 
            return state
    }

}

export default brandReducer;