import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  TypographyTypes,
} from "../utils";
import { Typography, withBackgroundHoc } from "../components";

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.LOGIN> {}

function Login(props: Props) {
  const {} = props;

  return (
    <View>
      <Typography type={TypographyTypes.BOLD34}>123</Typography>
      <Typography type={TypographyTypes.BOLD34}>АВwИ 123фывфывЗАЦИЯ</Typography>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(Login);
