import { UserActionsTypes } from "./../types";
import { createAction } from "@reduxjs/toolkit";

const setUserId = createAction(UserActionsTypes.SET_ID);
const setUserToken = createAction(UserActionsTypes.SET_TOKEN);
const setUserPhone = createAction(UserActionsTypes.SET_PHONE);
const setUserPhoto = createAction(UserActionsTypes.SET_PHOTO);
const setUserName = createAction(UserActionsTypes.SET_NAME);
const setUserRating = createAction(UserActionsTypes.SET_RATING);

export {
  setUserId,
  setUserToken,
  setUserPhone,
  setUserPhoto,
  setUserName,
  setUserRating,
};
