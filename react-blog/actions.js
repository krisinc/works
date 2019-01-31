import * as actionTypes from './actionTypes'
import * as WebAPI from './webAPI'



export const getPostList = () => ({
    type: actionTypes.GET_POSTS,
    payload: WebAPI.getPosts()
})

export const getPost = (id) => ({
    type: actionTypes.GET_POST,
    payload: WebAPI.getPost(id)
})


// react-thunk
// export const getPostList = () => {
//     return function(dispatch) {
//         dispatch(getPosts())
//         WebAPI.getPosts().then(res => {
//             dispatch(getPostsSuccess(res.data))
//         })
//     }
// }