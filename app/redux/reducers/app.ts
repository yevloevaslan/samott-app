import { createReducer, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AppActions } from "redux/actions";
import { IApp, reducer } from "utils";

export const appInitialState: IApp = {};

const appReducer = createReducer(
  appInitialState,
  (builder: ActionReducerMapBuilder<IApp>) => {
    builder.addCase(AppActions.resetApp, reducer);
  }
);

export default appReducer;
