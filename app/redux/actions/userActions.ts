import { IUserLogin, UserActionsTypes } from "./../types/userTypes";
import { createAction } from "@reduxjs/toolkit";

const setUserLogin = createAction<IUserLogin>(UserActionsTypes.SET_LOGIN_DATA);

export { setUserLogin };
