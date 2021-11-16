import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import bookReducer from './reducers/bookReducer';
import postReducer from './reducers/postReducer'

const rootReducer = combineReducers({ userReducer, bookReducer , postReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));  