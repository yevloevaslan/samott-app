import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackProps, RoutesNames, TypographyTypes } from "../utils";
import { Typography } from "../components";

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.LOGIN> {}

export default function Login(props: Props) {
  const {} = props;

  return (
    <View>
      <Typography type={TypographyTypes.BOLD34}>123</Typography>
      <Typography type={TypographyTypes.BOLD34}>АВwИ 123фывфывЗАЦИЯ</Typography>
    </View>
  );
}
