import { createAction } from "@reduxjs/toolkit";
import { ScoreActions } from "utils";

export const setScore = createAction<ScoreActions>(ScoreActions.SET_SCORE);
