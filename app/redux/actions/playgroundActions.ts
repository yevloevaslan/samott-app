import { createAction } from "@reduxjs/toolkit";

enum PlaygroundActions {
  SET_SCORE = "SET_SCORE",
  ADD_SCORE = "ADD_SCORE",
  SET_CURRENT_TASK = "SET_CURRENT_TASK",
  SET_CURRENT_DIFFICULT = "SET_CURRENT_DIFFICULT",
  SET_TASKS_COUNTS = "SET_TASKS_COUNT",
}

export const setScore = createAction(PlaygroundActions.SET_SCORE);
export const addScore = createAction(PlaygroundActions.ADD_SCORE);
export const setCurrentTask = createAction(PlaygroundActions.SET_CURRENT_TASK);
export const setCurrentDifficult = createAction<PlaygroundActions>(
  PlaygroundActions.SET_CURRENT_DIFFICULT
);

export const setTasksCount = createAction(PlaygroundActions.SET_TASKS_COUNTS);

export default PlaygroundActions;
