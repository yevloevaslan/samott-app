import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import {
  setUserId,
  setUserPhone,
  setUserPhoto,
  setUserToken,
  setUserName,
  setUserRating,
  setUserBirthday,
  setUserScore,
} from "../actions/userActions";
import { IUser } from "../types/userTypes";

export const userInitialState: IUser = {
  id: undefined,
  token: "",
  phone: undefined,
  firstName: "",
  middleName: "",
  lastName: "",
  email: undefined,
  birthday: undefined,
  score: 0,
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
    builder.addCase(setUserName, reducer);
    builder.addCase(setUserRating, reducer);
    builder.addCase(setUserBirthday, reducer);
    builder.addCase(setUserScore, reducer);
  }
);

export default userReducer;
