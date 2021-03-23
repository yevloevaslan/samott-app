import AsyncStorage from "@react-native-community/async-storage";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import { INITIAL_STATE } from "./initialState";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const loggerMiddleware = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  timestamp: true,
});

const middlewares: any[] = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(loggerMiddleware);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, INITIAL_STATE, enhancer);
  const persistor = persistStore(store);
  return { store, persistor };
};
