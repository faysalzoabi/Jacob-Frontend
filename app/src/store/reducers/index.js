import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import tagsReducer from "./tagsRecuder";
import pdfsReducer from "./pdfsReducer";


const reducers = combineReducers({
  token: tokenReducer,
  currentUser: userReducer,
  tags: tagsReducer,
  pdfs: pdfsReducer
});

export default reducers;
