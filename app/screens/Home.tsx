import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { HomeStackProps, RoutesNames } from "../utils";

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.HOME> {}

export default function Home(props: Props) {
  const {} = props;
  return <View />;
}
