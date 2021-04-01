export enum UserActionsTypes {
  SET_LOGIN_DATA = "SET_LOGIN_DATA",
}

export interface IUserLogin {
  id?: string;
  updatedAt: Date | null;
}

export interface IUser {
  loginData: IUserLogin;
}
