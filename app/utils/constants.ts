import { ARROW, BOOK, HOME, SHARE } from "assets/images";
import { Dimensions, Platform } from "react-native";
import { RoutesNames } from "./enums";
import { TabBarType } from "./types";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const IS_IOS = Platform.OS === "ios";

export const isX = IS_IOS && SCREEN_WIDTH / SCREEN_HEIGHT < 0.52;

export const TABS: TabBarType[] = [
  {
    image: HOME,
    index: 0,
    title: "Главная",
    routeName: RoutesNames.HOME,
  },
  {
    image: ARROW,
    index: 1,
    title: "Обучение",
    routeName: RoutesNames.MISSIONS,
  },
  {
    image: BOOK,
    index: 2,
    title: "Словарь",
    routeName: RoutesNames.DICTIONARY,
  },
  {
    image: SHARE,
    index: 3,
    title: "Поделиться",
    routeName: RoutesNames.SHARE,
  },
];

export const RESET_APP = "RESET_APP";

export const ANDROID_ADV_UNIT = "ca-app-pub-5779046058328214/7439664569";

export const IOS_ADV_UNIT = "ca-app-pub-5779046058328214/8102843693";

export const ADV_UNIT = Platform.OS === "ios" ? IOS_ADV_UNIT : ANDROID_ADV_UNIT;

export const GOOGLE_PLAY_APP_URL =
  "https://play.google.com/store/apps/details?id=com.SaMott";
export const APP_STORE_APP_URL =
  "itms-apps://itunes.apple.com/app/apple-store/id1587203789";
