import { RoutesNames } from "./enums";

export type MainRoutesProps = {
  [route in RoutesNames]?: any;
};

export type HomeStackProps = {
  [RoutesNames.MISSIONS]?: object;
  [RoutesNames.CODE_ENTER]?: {
    phone?: string;
    newTimer?: boolean;
  };
  [RoutesNames.PHONE_ENTER]?: object;
  [RoutesNames.ERROR_CODE]: {
    timerDuration: number;
    phoneNumber: string;
  };
  [RoutesNames.REGISTRATION]?: object;
  [RoutesNames.PIN_PHOTO]?: object;
  [RoutesNames.SPLASH]?: object;
  [RoutesNames.TAB_NAVIGATOR]?: object;
  [RoutesNames.PROFILE]?: object;
};

export type BorderedInputTypes =
  | "phone-number"
  | "auth-code"
  | "numbers-only"
  | "email"
  | "any";

export type TabBarType = {
  image: { uri: string };
  index: number;
  title: string;
  routeName: RoutesNames;
  size: { w: number; h: number };
};
