import { GET_BOOKS, LIKE_BOOK, GET_COMMENTS_BOOK } from "../types"

const INIT_STATE = {
    books: [],
    history: [],
    booksViewData: [],
    comments: [],
}

function bookReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case GET_BOOKS: 
            return {...state, books: action.payload.data1, history: action.payload.data2.bookForUser, booksViewData: action.payload.data2.AllBookHistorys}
        case LIKE_BOOK: 
            return {...state, history: action.payload.bookForUser, booksViewData: action.payload.AllBookHistorys}
        case GET_COMMENTS_BOOK: 
            return {...state, comments: action.payload.commentList}
            default: 
            return state;
    }
}
export default bookReducer;