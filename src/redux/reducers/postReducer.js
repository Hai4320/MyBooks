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
            return {...state, posts: action.payload.posts, history: action.payload.history.UserPostHistory, postViewData: action.payload.history.AllPostHistorys};
        case VIEW_POSTS: 
            return {...state, history: action.payload.UserPostHistory, postViewData: action.payload.AllPostHistorys}
        case GET_MY_POSTS:
            return {...state, myPosts: action.payload}
        default: return state; 
    }
}
export default postReducer;