import { UserActionsTypes } from "./../types";
import { createAction } from "@reduxjs/toolkit";

const setUserId = createAction(UserActionsTypes.SET_ID);
const setUserToken = createAction(UserActionsTypes.SET_TOKEN);
const setUserPhone = createAction(UserActionsTypes.SET_PHONE);

export { setUserId, setUserToken, setUserPhone };
