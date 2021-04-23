import { ImageSourcePropType, TextStyle } from "react-native";
import { Colors, TypographyTypes, BackgroundImages } from "utils";

export interface IApp {}

export interface GlobalState {
  user: IUser;
  app: IApp;
}

export interface IStyleGuide {
  colorPalette: { [color in Colors]: string };
  typography: { [typography in TypographyTypes]: TextStyle };
  backgrounds: { [background in BackgroundImages]: ImageSourcePropType };
}

export interface IUserInfo {
  lastName: string;
  middleName: string;
  firstName: string;
  email?: string;
  phone?: string;
  score?: number;
  birthday?: Date;
  sex?: "m" | "f";
}

export interface IUser extends IUserInfo {
  id?: string;
  phone?: string;
  token: string;
  photo?: { uri?: string };
}
