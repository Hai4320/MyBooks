import { GET_BOOKS, LIKE_BOOK } from "../types"

const INIT_STATE = {
    books: [],
    history: [],
    booksViewData: [],
    saved: [],
}

function bookReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case GET_BOOKS: 
            return {...state, books: action.payload.data1, history: action.payload.data2.bookForUser, booksViewData: action.payload.data2.AllBookHistorys}
        case LIKE_BOOK: 
            return {...state, history: action.payload}
            default: 
            return state;
    }
}
export default bookReducer;