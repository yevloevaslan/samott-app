import { IUserInfo } from "./../../utils/interfaces";
export type ApiLogin = {
  data: {
    _id: string;
    updatedAt: Date;
  };
};

export type ApiUserAuth = {
  data: {
    token: string;
    user: {
      phone: string;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
      firstIn: boolean;
    };
  };
};

export interface ApiUserInfo extends Omit<IUserInfo, "birthday"> {
  birthday: string;
  createdAt: Date;
  updatedAt: Date;
}
