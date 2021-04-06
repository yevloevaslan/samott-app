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

const enhancer = compose(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, INITIAL_STATE, enhancer);
export const persistor = persistStore(store);
