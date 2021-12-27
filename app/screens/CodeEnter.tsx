import { StackScreenProps } from "@react-navigation/stack";
import {
  BorderedInput,
  Button,
  Header,
  RadioButton,
  Typography,
  withBackgroundHoc,
} from "components";
import { useTimer } from "hooks";
import { UserController } from "lib";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";

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
  const phoneNumber = useRef<string>(props.route.params?.email || "").current;
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
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (props.route.params?.newTimer) {
      props.navigation.setParams({ email: phoneNumber });
      reset();
    }
  }, [props.route.params?.newTimer]);

  useEffect(() => {
    if (timerDuration === 1) {
      setTimerText("Отправить новый код");
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
      const response = await UserController.userAuth(parsedInputValue);
      if (response) {
        if (!response.user.firstIn) {
          await UserController.userGetInfo();
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
  }, [parsedInputValue, props.navigation, handleGoError]);

  const handleOnChangeText = useCallback((_text?: string, ext?: string) => {
    setParsedInputValue(ext);
  }, []);

  const handleOnTimerPress = useCallback(async () => {
    const response = await UserController.userLogin(phoneNumber);
    if (response) {
      reset();
      setTimerText("Отправить повторно через ");
    }
  }, [phoneNumber, reset]);

  const handleOnCheckboxPress = useCallback(() => {
    setIsPrivacyAccepted((prev) => !prev);
  }, []);

  const handleOnPrivacyTextGo = useCallback(() => {
    props.navigation.navigate(RoutesNames.PRIVACY_TEXT);
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Header
        titleType={TypographyTypes.BOLD18}
        decorators="all"
        title="АВТОРИЗАЦИЯ"
        alignTitle="center"
      />
      <View style={styles.contentContainer}>
        <BorderedInput
          onChangeText={handleOnChangeText}
          type="auth-code"
          placeholder="Введите код подтверждения"
          onError={setIsInputErrored}
          style={styles.phoneInput}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 12,
            marginRight: 20,
          }}
        >
          <View>
            <RadioButton
              value={isPrivacyAccepted}
              onPress={handleOnCheckboxPress}
            />
          </View>
          <TouchableOpacity onPress={handleOnPrivacyTextGo} style={{}}>
            <Text
              numberOfLines={2}
              style={{
                flexWrap: "wrap",
                width: Dimensions.get("window").width * 0.8,
              }}
            >
              <Typography
                color={StyleGuide.colorPalette.gray}
                type={TypographyTypes.NORMAL14}
              >
                Соглашаюсь на обработку{" "}
              </Typography>
              <Typography
                color={StyleGuide.colorPalette.black}
                type={TypographyTypes.NORMAL14}
              >
                персональных данных
              </Typography>
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.submitButton}
          disabled={isInputErrored || !isPrivacyAccepted}
          onPress={handleOnSubmitButtonPress}
          isLoading={isLoading}
        >
          <Typography textAlign="center" type={TypographyTypes.NORMAL18}>
            Создать аккаунт
          </Typography>
        </Button>
        <TouchableOpacity
          style={styles.timerButton}
          onPress={handleOnTimerPress}
          disabled={timerDuration !== 0}
        >
          <Typography
            color={"#828282"}
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
