import { SET_HL } from "../constants"

const initialState = [];

function highlightReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HL: {

            const newhighlights = [...action.data];
            return newhighlights;
        }
        default:
            return state;
    }
}

export default highlightReducer;