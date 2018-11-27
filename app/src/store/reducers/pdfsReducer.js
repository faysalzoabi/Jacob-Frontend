import {SET_PDFS} from '../constants';

const initialState = [];

function pdfsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_PDFS: {
      const newPdfs = [...action.data];
      return newPdfs;
    }
    default:
      return state;
  }
}

export default pdfsReducer;