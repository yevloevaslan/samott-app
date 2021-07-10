import { GlobalState } from "../utils";
import { userInitialState, appInitialState } from "./reducers";
import { dictionaryInitialState } from "./reducers/dictionary";
import { playgroundInitialState } from "./reducers/playground";

export const INITIAL_STATE: GlobalState = {
  user: userInitialState,
  app: appInitialState,
  playground: playgroundInitialState,
  dictionary: dictionaryInitialState,
};
