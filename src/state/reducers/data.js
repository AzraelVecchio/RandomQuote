const data = require('./db.json');

const initialState = Submit_Data();

function Submit_Data() {

  let odds = data.length-1;

  let fdata = Object.assign({}, data[Math.round(Math.random() * odds)]);

  return fdata;
 
}


const NEWSTATE = "NEWSTATE";

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case NEWSTATE:
            return Submit_Data();
        default:
            return state;        
    }
}

export default reducer;