import {LOGIN, LOGOUT} from "../types"


const INIT_STATE = {
    name: null,
    email: null,
    avatar: null,
    role: null
};

function userReducer(state = INIT_STATE, action) 
{
    switch (action.type) {
        case LOGIN:
            return {...state}
        case LOGOUT:
            return {...state}
        default: 
            return state;
    }
}



export default userReducer;