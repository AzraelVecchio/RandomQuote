const initialState = true;

const reducer2 = (state = initialState, action) => {
    const play = action.type;
    switch(play) {
        case true:
            return false
        case false:
            return true
        default:
            return state
    }

}

export default reducer2