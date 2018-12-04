import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import tagsReducer from "./tagsRecuder";
import pdfsReducer from "./pdfsReducer";
import phrasesReducer from "./phrasesRecuder";
import highlightReducer from "./highlightReducer"

const reducers = combineReducers({
  token: tokenReducer,
  currentUser: userReducer,
  tags: tagsReducer,
  pdfs: pdfsReducer,
  phrases: phrasesReducer,
  highlights: highlightReducer,
});

export default reducers;
