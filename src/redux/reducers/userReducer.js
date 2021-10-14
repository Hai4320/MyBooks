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
            return {
                ...state, 
                name: action.payload.name, 
                avatar: action.payload.avatar, 
                role: action.payload.role, 
                email: action.payload.email
            };
        case LOGOUT:
            return {...state}
        default: 
            return state;
    }
}



export default userReducer;