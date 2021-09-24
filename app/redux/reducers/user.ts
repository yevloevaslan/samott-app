import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { IUser, reducer } from "utils";
import { UserActions } from "redux/actions";

export const userInitialState: IUser = {
  id: undefined,
  token: "",
  phone: undefined,
  firstName: "",
  middleName: "",
  lastName: "",
  email: undefined,
  birthday: new Date(),
  score: 0,
  sex: undefined,
  img: "",
};

const userReducer = createReducer(
  userInitialState,
  (builder: ActionReducerMapBuilder<IUser>) => {
    builder.addCase(UserActions.setUserId, reducer);
    builder.addCase(UserActions.setUserPhone, reducer);
    builder.addCase(UserActions.setUserToken, reducer);
    builder.addCase(UserActions.setUserName, reducer);
    builder.addCase(UserActions.setUserRating, reducer);
    builder.addCase(UserActions.setUserBirthday, reducer);
    builder.addCase(UserActions.setUserInfo, reducer);
    builder.addCase(UserActions.setUser, reducer);
    builder.addCase(UserActions.setUserImg, reducer);
  }
);

export default userReducer;
