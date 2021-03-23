import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { RoutesNames } from "../navigation/routesNames";
import { HomeStackProps } from "../utils";

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.HOME> {}

export default function Home(props: Props) {
  const {} = props;
  return <View />;
}
