import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  TypographyTypes,
} from "../utils";
import { Button, RedTitle, Typography, withBackgroundHoc } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 79,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 76,
    flex: 1,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.LOGIN> {}

function Login(props: Props) {
  const {} = props;

  const handleOnSubmitButtonPress = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <RedTitle decorators="all">
        <Typography type={TypographyTypes.BOLD34}>АВТОРИЗАЦИЯ</Typography>
      </RedTitle>
      <View style={styles.contentContainer}>
        <Button onPress={handleOnSubmitButtonPress}>
          <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
            Продолжить
          </Typography>
        </Button>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(Login);
