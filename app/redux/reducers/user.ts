import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import {
  setUserId,
  setUserPhone,
  setUserPhoto,
  setUserToken,
} from "../actions/userActions";
import { IUser } from "../types/userTypes";

export const userInitialState: IUser = {
  id: undefined,
  token: "",
  phone: undefined,
};

function reducer(state: IUser, action: { type: string; payload: any }) {
  return { ...state, ...action.payload };
}

const userReducer = createReducer(
  userInitialState,
  (builder: ActionReducerMapBuilder<IUser>) => {
    builder.addCase(setUserId, reducer);
    builder.addCase(setUserPhone, reducer);
    builder.addCase(setUserToken, reducer);
    builder.addCase(setUserPhoto, reducer);
  }
);

export default userReducer;
