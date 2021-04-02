import { GlobalState } from "../utils";
import { userInitialState } from "./reducers/user";

export const INITIAL_STATE: GlobalState = {
  user: { ...userInitialState },
};
