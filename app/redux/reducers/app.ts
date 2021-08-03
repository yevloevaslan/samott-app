import { createReducer, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AppActions } from "redux/actions";
import { IApp, reducer } from "utils";

export const appInitialState: IApp = {
  isPlaying: false,
  bannerUrl: undefined,
};

const appReducer = createReducer(
  appInitialState,
  (builder: ActionReducerMapBuilder<IApp>) => {
    builder
      .addCase(AppActions.resetApp, reducer)
      .addCase(AppActions.setProfileBanner, reducer)
      .addCase(AppActions.setIsPlaying, reducer);
  }
);

export default appReducer;
