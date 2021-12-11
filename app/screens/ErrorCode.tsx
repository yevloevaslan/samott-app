import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  HomeStackProps,
  StyleGuide,
  BackgroundImages,
  RoutesNames,
  TypographyTypes,
} from "utils";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Typography, withBackgroundHoc } from "components";
import { useTimer } from "hooks";
import { UserController } from "lib";

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    paddingTop: 79,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 32,
    flex: 1,
  },
  timerButton: {
    alignItems: "center",
  },
  bubbleContainer: {
    marginBottom: 24,
    backgroundColor: StyleGuide.colorPalette.orange,
    borderRadius: 17,
    paddingVertical: 12,
  },
  bubbleTextContainer: {},
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.ERROR_CODE> {}

function ErrorCode(props: Props) {
  const { phoneNumber, timerDuration } = props.route.params;
  const { seconds, formatted } = useTimer(timerDuration, timerDuration, true);
  const [timerText, setTimerText] = useState<string>(
    "Отправить повторно код через "
  );

  useEffect(() => {
    if (seconds === 1) {
      setTimerText("ОТПРАВИТЬ НОВЫЙ КОД");
    }
  }, [seconds]);

  const handleOnTimerPress = useCallback(async () => {
    const response = await UserController.userLogin(phoneNumber);
    if (response) {
      props.navigation.navigate(RoutesNames.CODE_ENTER, { newTimer: true });
    }
  }, [phoneNumber, props.navigation]);

  return (
    <View style={styles.containerWrapper}>
      <Header
        titleType={TypographyTypes.BOLD18}
        title="АВТОРИЗАЦИЯ"
        decorators="all"
        alignTitle="center"
      />
      <View style={styles.contentContainer}>
        <View style={styles.bubbleContainer}>
          <Typography
            textAlign="center"
            type={TypographyTypes.NORMAL18}
            style={{ marginBottom: 8, fontSize: 16 }}
          >
            НЕВЕРНЫЙ КОД
          </Typography>
          <View style={styles.bubbleTextContainer}>
            <Typography
              type={TypographyTypes.NORMAL18}
              // numberOfLines={1}
              textAlign="center"
              style={{ fontSize: 16 }}
            >
              Проверьте корректность ввода
            </Typography>
          </View>
        </View>
        <TouchableOpacity
          style={styles.timerButton}
          onPress={handleOnTimerPress}
          disabled={seconds !== 0}
        >
          <Typography
            color={"#828282"}
            type={
              seconds === 0
                ? TypographyTypes.NORMAL900
                : TypographyTypes.ITALIC18
            }
          >
            {timerText} {seconds !== 0 && formatted}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(ErrorCode);
