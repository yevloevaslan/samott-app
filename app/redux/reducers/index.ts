import { combineReducers } from "redux";
import { GlobalState, RESET_APP } from "../../utils";
import appReducer from "./app";
import userReducer from "./user";
import { appInitialState } from "./app";
import { userInitialState } from "./user";
import { INITIAL_STATE } from "../initialState";

const rootReducer = combineReducers<GlobalState>({
  user: userReducer,
  app: appReducer,
});

const mainReducer = (state: GlobalState | undefined, action: { type: any }) => {
  if (action.type === RESET_APP) {
    state = INITIAL_STATE;
  }

  return rootReducer(state, action);
};

export { appInitialState, userInitialState };
export default mainReducer;
