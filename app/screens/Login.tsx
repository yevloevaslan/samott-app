import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackProps } from "../utils";
import { RoutesNames } from "../navigation/routesNames";

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.LOGIN> {}

export default function Login(props: Props) {
  const {} = props;
  return <View />;
}
