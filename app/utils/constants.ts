import { TabBarType } from "./types";
import { ARROW, BOOK, HOME, SHARE } from "assets/images";
import { Dimensions, Platform } from "react-native";
import { RoutesNames } from "./enums";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const IS_IOS = Platform.OS === "ios";

export const isX = IS_IOS && SCREEN_WIDTH / SCREEN_HEIGHT < 0.52;

export const TABS: TabBarType[] = [
  {
    image: HOME,
    index: 0,
    title: "ДОМОЙ",
    routeName: RoutesNames.HOME,
  },
  {
    image: ARROW,
    index: 1,
    title: "УЧИТЬСЯ",
    routeName: RoutesNames.MISSIONS,
  },
  {
    image: BOOK,
    index: 2,
    title: "СЛОВАРЬ",
    routeName: RoutesNames.DICTIONARY,
  },
  {
    image: SHARE,
    index: 3,
    title: "ПОДЕЛИТЬСЯ",
    routeName: RoutesNames.SHARE,
  },
];

export const RESET_APP = "RESET_APP";
