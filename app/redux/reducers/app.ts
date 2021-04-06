import { createReducer, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IApp } from "./../types/appTypes";
import { AppActions } from "../actions";
import { reducer } from "../../utils";

export const appInitialState: IApp = {};

const appReducer = createReducer(
  appInitialState,
  (builder: ActionReducerMapBuilder<IApp>) => {
    builder.addCase(AppActions.resetApp, reducer);
  }
);

export default appReducer;
