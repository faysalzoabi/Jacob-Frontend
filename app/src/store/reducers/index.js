import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import tagsReducer from "./tagsRecuder";


const reducers = combineReducers({
  token: tokenReducer,
  currentUser: userReducer,
  tags: tagsReducer
});

export default reducers;
