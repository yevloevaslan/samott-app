import { createAction } from "@reduxjs/toolkit";
import { AppActionsTypes } from "utils";

export const resetApp = createAction<undefined>(AppActionsTypes.RESET_APP);
export const setIsPlaying = createAction<boolean>(
  AppActionsTypes.SET_IS_PLAYING
);
export const setProfileBanner = createAction<string>(
  AppActionsTypes.SET_PROFILE_BANNER
);
