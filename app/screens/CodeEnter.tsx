import React, { useCallback, useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  BorderedInput,
  Button,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import { UserController } from "lib";
import { StackScreenProps } from "@react-navigation/stack";
import {
  RoutesNames,
  StyleGuide,
  BackgroundImages,
  TypographyTypes,
  HomeStackProps,
} from "utils";
import { useTimer } from "hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 79,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 39,
    flex: 1,
  },
  phoneInput: {
    marginBottom: 10,
  },
  timerButton: {
    alignItems: "center",
  },
  submitButton: {
    marginBottom: 20,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.CODE_ENTER> {}

function CodeEnter(props: Props) {
  const phoneNumber = useRef<string>(props.route.params?.phone || "").current;
  const userController = UserController();
  const { seconds: timerDuration, formatted, reset } = useTimer(
    60,
    undefined,
    true
  );
  const [parsedInputValue, setParsedInputValue] = useState<string>();
  const [isInputErrored, setIsInputErrored] = useState<boolean | undefined>(
    true
  );
  const [timerText, setTimerText] = useState<string>(
    "Повторно отправить через "
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.route.params?.newTimer) {
      props.navigation.setParams({ phone: phoneNumber });
      reset();
    }
  }, [props.route.params?.newTimer]);

  useEffect(() => {
    if (timerDuration === 1) {
      setTimerText("ОТПРАВИТЬ НОВЫЙ КОД");
    }
  }, [timerDuration]);

  const handleGoError = useCallback(() => {
    props.navigation.navigate(RoutesNames.ERROR_CODE, {
      timerDuration,
      phoneNumber,
    });
  }, [phoneNumber, props.navigation, timerDuration]);

  const handleOnSubmitButtonPress = useCallback(async () => {
    if (parsedInputValue) {
      setIsLoading(true);
      const response = await userController.userAuth(parsedInputValue);
      if (response) {
        if (!response.user.firstIn) {
          await userController.userGetInfo();
        }
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: response.user.firstIn
                ? RoutesNames.PROFILE_SETTINGS
                : RoutesNames.TAB_NAVIGATOR,
              params: { firstIn: true },
            },
          ],
        });
        return;
      } else {
        handleGoError();
      }
      setIsLoading(false);
    } else {
      handleGoError();
    }
  }, [parsedInputValue, userController, props.navigation, handleGoError]);

  const handleOnChangeText = useCallback((_text?: string, ext?: string) => {
    setParsedInputValue(ext);
  }, []);

  const handleOnTimerPress = useCallback(async () => {
    const response = await userController.userLogin(phoneNumber);
    if (response) {
      reset();
      setTimerText("Отправить повторно через ");
    }
  }, [phoneNumber, reset, userController]);

  return (
    <View style={styles.container}>
      <Header
        titleType={TypographyTypes.BOLD34}
        decorators="all"
        title="АВТОРИЗАЦИЯ"
      />
      <View style={styles.contentContainer}>
        <BorderedInput
          onChangeText={handleOnChangeText}
          type="auth-code"
          placeholder="Введите код подтверждения"
          onError={setIsInputErrored}
          style={styles.phoneInput}
        />
        <Button
          style={styles.submitButton}
          disabled={isInputErrored}
          onPress={handleOnSubmitButtonPress}
          isLoading={isLoading}
        >
          <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
            Создать аккаунт
          </Typography>
        </Button>
        <TouchableOpacity
          style={styles.timerButton}
          onPress={handleOnTimerPress}
          disabled={timerDuration !== 0}
        >
          <Typography
            color={StyleGuide.colorPalette.blue}
            type={
              timerDuration === 0
                ? TypographyTypes.NORMAL900
                : TypographyTypes.ITALIC18
            }
          >
            {timerText} {timerDuration !== 0 && formatted}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(CodeEnter);
