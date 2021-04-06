import { GlobalState } from "../utils";
import { userInitialState, appInitialState } from "./reducers";

export const INITIAL_STATE: GlobalState = {
  user: { ...userInitialState },
  app: { ...appInitialState },
};
