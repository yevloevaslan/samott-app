import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { setUserId } from "../actions/userActions";
import { IUser } from "../types/userTypes";

const initialState: IUser = {
  id: "",
};

const userReducer = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<IUser>) => {
    builder.addCase(setUserId, (state, action) => ({
      ...state,
      id: action.payload,
    }));
  }
);

export default userReducer;
