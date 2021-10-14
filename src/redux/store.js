import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import bookReducer from './reducers/bookReducer';

const rootReducer = combineReducers({ userReducer, bookReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));  