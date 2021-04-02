import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BackgroundImages, RoutesNames, TypographyTypes } from "../utils/enums";
import { HomeStackProps, StyleGuide } from "../utils";
import { StackScreenProps } from "@react-navigation/stack";
import { Bubble, RedTitle, Typography, withBackgroundHoc } from "../components";
import { useTimer } from "../hooks";
import UserController from "../lib/controllers/UserController";

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    paddingTop: 79,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 39,
    flex: 1,
  },
  timerButton: {
    alignItems: "center",
  },
  bubbleContainer: {
    marginBottom: 20,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.ERROR_CODE> {}

function ErrorCode(props: Props) {
  const { phoneNumber, timerDuration } = props.route.params;
  const userController = UserController();
  const { seconds, formatted } = useTimer(timerDuration, timerDuration, true);
  const [timerText, setTimerText] = useState<string>(
    "Отправить повторно код через "
  );

  useEffect(() => {
    if (seconds === 1) {
      setTimerText("ОТПРАВИТЬ НОВЫЙ КОД");
    }
  }, [seconds]);

  const handleOnTimerPress = useCallback(() => {
    const response = userController.userLogin(phoneNumber);
    if (response) {
      props.navigation.navigate(RoutesNames.CODE_ENTER, { newTimer: true });
    }
  }, [phoneNumber, props.navigation, userController]);

  return (
    <View style={styles.containerWrapper}>
      <RedTitle decorators="all">
        <Typography type={TypographyTypes.BOLD34}>АВТОРИЗАЦИЯ</Typography>
      </RedTitle>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView scrollEnabled={false} style={styles.contentContainer}>
          <View style={styles.bubbleContainer}>
            <Bubble
              backgroundColor={StyleGuide.colorPalette.orange}
              title={"НЕВЕРНЫЙ КОД\nПОДТВЕРЖДЕНИЯ!"}
              content={"Проверьте коректность\nвведения кода подтверждения"}
            />
          </View>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={handleOnTimerPress}
            disabled={seconds !== 0}
          >
            <Typography
              color={StyleGuide.colorPalette.blue}
              type={
                seconds === 0
                  ? TypographyTypes.NORMAL900
                  : TypographyTypes.ITALIC18
              }
            >
              {timerText} {seconds !== 0 && formatted}
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(ErrorCode);
