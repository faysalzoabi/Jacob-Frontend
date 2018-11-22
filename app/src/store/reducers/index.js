import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';


const reducers = combineReducers({
  token: tokenReducer,
  currentUser: userReducer,
});

export default reducers;
