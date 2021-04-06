import { ImageSourcePropType, TextStyle } from "react-native";
import { IUser, IApp } from "../redux/types";
import { Colors, TypographyTypes, BackgroundImages } from "./enums";

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
}
