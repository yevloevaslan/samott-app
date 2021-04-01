import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { setUserLogin } from "../actions/userActions";
import { IUser } from "../types/userTypes";

const initialState: IUser = {
  loginData: {
    id: undefined,
    updatedAt: null,
  },
};

const userReducer = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<IUser>) => {
    builder.addCase(setUserLogin, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  }
);

export default userReducer;
