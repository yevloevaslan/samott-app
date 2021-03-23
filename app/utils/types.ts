import { RoutesNames } from "../navigation/routesNames";

export type MainRoutesProps = {
  [route in RoutesNames]?: any;
};

export type HomeStackProps = {
  [RoutesNames.HOME]: {
    a: boolean;
  };
  [RoutesNames.LOGIN]: {};
};
