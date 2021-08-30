import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {isLoading: true, errmsg: null, promos: []}, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading:false, errmsg: null, promos: action.payload}
        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errmsg: null, promos: []}
        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errmsg: action.payload, promos: []}        
        default:
            return state;
    }
}