import { TabBarType } from "./types";
import { ARROW, BOOK, HOME, SHARE } from "./../assets/images/index";
import { Platform } from "react-native";
import { RoutesNames } from "./enums";

export const IS_IOS = Platform.OS === "ios";

export const TABS: TabBarType[] = [
  {
    image: HOME,
    index: 0,
    title: "ДОМОЙ",
    routeName: RoutesNames.MISSIONS,
    size: { w: 45, h: 50 },
  },
  {
    image: ARROW,
    index: 1,
    title: "УЧИТЬСЯ",
    routeName: RoutesNames.MISSIONS,
    size: { w: 49, h: 50 },
  },
  {
    image: BOOK,
    index: 2,
    title: "СЛОВАРЬ",
    routeName: RoutesNames.MISSIONS,
    size: { w: 40, h: 50 },
  },
  {
    image: SHARE,
    index: 3,
    title: "ПОДЕЛИТЬСЯ",
    routeName: RoutesNames.MISSIONS,
    size: { w: 50, h: 49 },
  },
];
