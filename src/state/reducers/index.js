import { combineReducers } from "redux";
import reducer from "./data";
import reducer2 from "./audioPlay";
const reducers = combineReducers({data: reducer, play: reducer2});

export default reducers;