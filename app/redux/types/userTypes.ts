export enum UserActionsTypes {
  SET_ID = "SET_ID",
  SET_TOKEN = "SET_TOKEN",
  SET_PHONE = "SET_PHONE",
  SET_PHOTO = "SET_PHOTO",
}

export interface IUser {
  id?: string;
  phone?: string;
  token: string;
  photo?: { uri?: string };
}
