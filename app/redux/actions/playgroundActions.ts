import { createAction } from "@reduxjs/toolkit";

enum PlaygroundActions {
  SET_SCORE = "SET_SCORE",
  ADD_SCORE = "ADD_SCORE",
  SET_EASY_LEVEL_SCORE = "SET_EASY_LEVEL_SCORE",
  SET_MEDIUM_LEVEL_SCORE = "SET_MEDIUM_LEVEL_SCORE",
  SET_HARD_LEVEL_SCORE = "SET_HARD_LEVEL_SCORE",
  SET_CURRENT_TASK = "SET_CURRENT_TASK",
  SET_CURRENT_DIFFICULT = "SET_CURRENT_DIFFICULT",
}

export const setScore = createAction(PlaygroundActions.SET_SCORE);
export const addScore = createAction(PlaygroundActions.ADD_SCORE);
export const setEasyLevelScore = createAction(
  PlaygroundActions.SET_EASY_LEVEL_SCORE
);
export const setMediumLevelScore = createAction(
  PlaygroundActions.SET_MEDIUM_LEVEL_SCORE
);
export const setHardLevelScore = createAction(
  PlaygroundActions.SET_HARD_LEVEL_SCORE
);
export const setCurrentTask = createAction(PlaygroundActions.SET_CURRENT_TASK);
export const setCurrentDifficult = createAction<PlaygroundActions>(
  PlaygroundActions.SET_CURRENT_DIFFICULT
);

export default PlaygroundActions;
