import { ImageSourcePropType, TextStyle } from "react-native";
import { BACKGROUND_WITH_CASTLE } from "../assets/images";
import { BackgroundImages, Colors, TypographyTypes } from "./enums";
import { IStyleGuide } from "./interfaces";
import { BACKGROUND_WITH_ORNAMENTS } from "../assets/images/index";

const colorPalette: { [color in Colors]: string } = {
  [Colors.WHITE]: "#FFFFFF",
  [Colors.RED]: "#DD5758",
  [Colors.ORANGE]: "#F2994A",
  [Colors.GRAY]: "#C4C4C4",
  [Colors.BLUE]: "#2F80ED",
  [Colors.TRANSPARENT]: "transparent",
  [Colors.GREEN]: "#27AE60",
};

const typography: { [key in TypographyTypes]: TextStyle } = {
  [TypographyTypes.NORMAL12]: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 14,
  },
  [TypographyTypes.NORMAL14]: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 16,
  },
  [TypographyTypes.NORMAL18]: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    lineHeight: 21,
  },
  [TypographyTypes.NORMAL24]: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    lineHeight: 28,
  },
  [TypographyTypes.NORMAL500]: {
    fontWeight: "500",
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    lineHeight: 28,
  },
  [TypographyTypes.NORMAL900]: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "900",
  },
  [TypographyTypes.ITALIC18]: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    lineHeight: 14,
    fontStyle: "italic",
  },
  [TypographyTypes.BOLD18]: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
  },
  [TypographyTypes.BOLD24]: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
  },
  [TypographyTypes.BOLD34]: {
    fontFamily: "Roboto-Regular",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "bold",
  },
};

const backgrounds: { [background in BackgroundImages]: ImageSourcePropType } = {
  [BackgroundImages.WITH_CASTLES]: BACKGROUND_WITH_CASTLE,
  [BackgroundImages.WITH_ORNAMENTS]: BACKGROUND_WITH_ORNAMENTS,
};

export const StyleGuide: IStyleGuide = {
  colorPalette,
  typography,
  backgrounds,
};
