import { GET_BOOKS } from "../types"

const INIT_STATE = {
    books: [],
    history: [],
    saved: [],
}

function bookReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case GET_BOOKS: 
            return {...state, books: action.payload}
        default: 
            return state;
    }
}
export default bookReducer;