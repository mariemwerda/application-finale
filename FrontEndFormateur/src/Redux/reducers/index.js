import { combineReducers } from "redux";
import formationReducers from "./formationsReducer";
import userReducers from "./userReducer";
import fileReducers from "./fileReducer";

const rootReducer= combineReducers({
allformations:formationReducers,
allusers:userReducers,
allfiles: fileReducers,
});
export default rootReducer
