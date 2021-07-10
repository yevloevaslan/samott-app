import { createAction } from "@reduxjs/toolkit";
import { AppActions } from "utils";

export const resetApp = createAction(AppActions.RESET_APP);
export const setIsPlaying = createAction(AppActions.SET_IS_PLAYING);
