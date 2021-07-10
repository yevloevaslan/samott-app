import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import * as PlaygroundActionsTypes from "redux/actions/playgroundActions";
import { IPlaygound, reducer } from "utils";

export const playgroundInitialState: IPlaygound = {
  totalScore: 0,
  easyLevelScore: 0,
  mediumLevelScore: 0,
  hardLevelScore: 0,
  currentTask: undefined,
  currentDifficult: undefined,
};

const playgroundReducer = createReducer(
  playgroundInitialState,
  (builder: ActionReducerMapBuilder<IPlaygound>) => {
    builder.addCase(PlaygroundActionsTypes.setScore, reducer);
    builder.addCase(PlaygroundActionsTypes.addScore, reducer);
    builder.addCase(PlaygroundActionsTypes.setEasyLevelScore, reducer);
    builder.addCase(PlaygroundActionsTypes.setMediumLevelScore, reducer);
    builder.addCase(PlaygroundActionsTypes.setHardLevelScore, reducer);
    builder.addCase(PlaygroundActionsTypes.setCurrentTask, reducer);
    builder.addCase(PlaygroundActionsTypes.setCurrentDifficult, reducer);
  }
);

export default playgroundReducer;
