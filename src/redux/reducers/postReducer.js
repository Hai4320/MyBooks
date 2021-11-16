import { GET_POSTS, GET_MY_POSTS,VIEW_POSTS, GET_COMMENTS } from "../types"

const INIT_STATE = {
    posts: [],
    history: [],
    postViewData: [],
    myPosts: [],
    comments: [],
}

function postReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case GET_POSTS: 
            return {...state, posts: action.payload.posts};
        default: return state; 
    }
}
export default postReducer;