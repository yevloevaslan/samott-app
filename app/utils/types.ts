import { RoutesNames } from "./enums";

export type MainRoutesProps = {
  [route in RoutesNames]?: any;
};

export type HomeStackProps = {
  [RoutesNames.HOME]?: {};
  [RoutesNames.CODE_ENTER]?: {
    phone?: string;
    newTimer?: boolean;
  };
  [RoutesNames.PHONE_ENTER]?: {};
  [RoutesNames.ERROR_CODE]: {
    timerDuration: number;
    phoneNumber: string;
  };
  [RoutesNames.REGISTRATION]?: {};
};

export type BorderedInputTypes =
  | "phone-number"
  | "auth-code"
  | "numbers-only"
  | "email"
  | "any";
