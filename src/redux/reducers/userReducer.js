import {LOGIN, LOGOUT,GET_NOTIFY} from "../types"


const INIT_STATE = {
    user: {name: null,email: null,avatar: null,role: null},
    notifications: []
};

function userReducer(state = INIT_STATE, action) 
{
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user:{ 
                    name: action.payload.name, 
                    avatar: action.payload.avatar, 
                    role: action.payload.role, 
                    email: action.payload.email
                }
            };
        case GET_NOTIFY:
            return {...state,notifications: action.payload}
        case LOGOUT:
            return {...state}
        default: 
            return state;
    }
}



export default userReducer;