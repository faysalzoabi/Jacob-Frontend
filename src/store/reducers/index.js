const initialState = {
    restaurants: [],
    curr_user: {},
    token: {},
    reviews: [],
    searchIsFinished: false,
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        // PlaceHolder
        default:
            return state;
    }
}
export default reducer;
