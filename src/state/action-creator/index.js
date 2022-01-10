export const addData = () => {
    return (dispatch) => {
        dispatch({type: 'NEWSTATE'})
    }
}

export const play = (value) => {
    return (dispatch) => {
        dispatch({type: value})
    }
}