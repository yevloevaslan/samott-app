import { IUserInfo } from "../../utils";

export enum UserActionsTypes {
  SET_ID = "SET_ID",
  SET_TOKEN = "SET_TOKEN",
  SET_PHONE = "SET_PHONE",
  SET_PHOTO = "SET_PHOTO",
  SET_NAME = "SET_NAME",
  SET_RATING = "SET_RATING",
  SET_BIRTHDAY = "SET_BIRTHDAY",
  SET_SCORE = "SET_SCORE",
}

export interface IUser extends IUserInfo {
  id?: string;
  phone?: string;
  token: string;
  photo?: { uri?: string };
}
