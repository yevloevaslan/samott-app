import { createAction } from "@reduxjs/toolkit";
import { UserActionsTypes } from "utils";

export const setUserId = createAction(UserActionsTypes.SET_ID);
export const setUserToken = createAction(UserActionsTypes.SET_TOKEN);
export const setUserPhone = createAction(UserActionsTypes.SET_PHONE);
export const setUserPhoto = createAction(UserActionsTypes.SET_PHOTO);
export const setUserName = createAction(UserActionsTypes.SET_NAME);
export const setUserRating = createAction(UserActionsTypes.SET_RATING);
export const setUserBirthday = createAction(UserActionsTypes.SET_BIRTHDAY);
export const setUserInfo = createAction(UserActionsTypes.SET_INFO);
export const setUser = createAction(UserActionsTypes.SET_USER);
