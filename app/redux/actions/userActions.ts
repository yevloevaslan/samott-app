import { UserActionsTypes } from "./../types/userTypes";
import { createAction } from "@reduxjs/toolkit";

const setUserId = createAction<string>(UserActionsTypes.SET_ID);

export { setUserId };
