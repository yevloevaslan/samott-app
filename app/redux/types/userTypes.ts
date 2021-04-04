export enum UserActionsTypes {
  SET_ID = "SET_ID",
  SET_TOKEN = "SET_TOKEN",
  SET_PHONE = "SET_PHONE",
  SET_PHOTO = "SET_PHOTO",
  SET_NAME = "SET_NAME",
  SET_RATING = "SET_RATING",
}

export interface IUser {
  id?: string;
  phone?: string;
  token: string;
  photo?: { uri?: string };
  lastName: string;
  middleName: string;
  firstName: string;
  email?: string;
}
