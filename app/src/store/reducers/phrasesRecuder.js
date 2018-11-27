import {SET_PHRASES} from '../constants';

const initialState = [];

function phrasesReducer (state = initialState, action) {
  switch (action.type) {
    case SET_PHRASES: {
      const newPhrases = [...action.data];
      return newPhrases;
    }
    default:
      return state;
  }
}


export default phrasesReducer;