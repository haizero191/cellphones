import {
    ACTION_LOAD_CATE_REQUEST, 
    ACTION_LOAD_CATE_SUCCESS,
    ACTION_CREATE_CATE_SUCCESS
} from "../contants/cateConstants";


var initialState = {
    loading: false,
    success: false,
    resultData: [

    ]
}

const cateReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION_LOAD_CATE_REQUEST: {
            return {...state,
                loading: true,
            }
        }
        case ACTION_LOAD_CATE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                resultData: action.payload
            }
        }
        case ACTION_CREATE_CATE_SUCCESS:{
            return state
        }
        default: 
            return state
    }

}

export default cateReducer;