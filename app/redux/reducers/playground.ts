import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import * as PlaygroundActionsTypes from "redux/actions/playgroundActions";
import { IPlaygound, MissionDifficultType, reducer } from "utils";

export const playgroundInitialState: IPlaygound = {
  totalScore: 0,
  currentTask: undefined,
  currentDifficult: MissionDifficultType.EASY,
  counts: {
    totalTasksCount: {
      [MissionDifficultType.EASY]: 0,
      [MissionDifficultType.MEDIUM]: 0,
      [MissionDifficultType.HARD]: 0,
    },
    userTasksCount: {
      [MissionDifficultType.EASY]: 0,
      [MissionDifficultType.MEDIUM]: 0,
      [MissionDifficultType.HARD]: 0,
    },
  },
};

const playgroundReducer = createReducer(
  playgroundInitialState,
  (builder: ActionReducerMapBuilder<IPlaygound>) => {
    builder.addCase(PlaygroundActionsTypes.setScore, reducer);
    builder.addCase(PlaygroundActionsTypes.addScore, reducer);
    builder.addCase(PlaygroundActionsTypes.setCurrentTask, reducer);
    builder.addCase(PlaygroundActionsTypes.setCurrentDifficult, reducer);
    builder.addCase(PlaygroundActionsTypes.setTasksCount, reducer);
  }
);

export default playgroundReducer;
