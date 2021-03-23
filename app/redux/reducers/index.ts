import { combineReducers } from "redux";
import { GlobalState } from "../../utils";
import userReducer from "./user";

const rootReducer = combineReducers<GlobalState>({
  user: userReducer,
});

export default rootReducer;
