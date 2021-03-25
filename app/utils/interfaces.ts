import { TextStyle } from "react-native";
import { IUser } from "../redux/types/userTypes";
import { Colors, TypographyTypes } from "./enums";

export interface GlobalState {
  user: IUser;
}

export interface IStyleGuide {
  colorPalette: { [color in Colors]: string };
  typography: { [typography in TypographyTypes]: TextStyle };
}
