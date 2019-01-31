import * as actionTypes from "./actionTypes";

const state = {
    isLoadingGetPosts: false,
    posts: []
}

function reducer(globalState = state, action) {
    switch (action.type) {
        case `${actionTypes.GET_POSTS}_PENDING`:
            return {
                ...globalState,
                isLoadingGetPosts: true
            }
        case `${actionTypes.GET_POSTS}_FULFILLED`:
            return {
                ...globalState,
                isLoadingGetPosts: false,
                posts: action.payload.data
            }
        case `${actionTypes.GET_POST}_PENDING`:
            return {
                ...globalState,
                isLoadingGetPosts: true
            }
        case `${actionTypes.GET_POST}_FULFILLED`:
            return {
                ...globalState,
                isLoadingGetPosts: false,
                post: action.payload.data
            }
        default: 
            return globalState
    }
}

export default reducer