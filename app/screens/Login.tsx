import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { BackgroundImages, TypographyTypes } from "../utils";
import {
  BorderedInput,
  Button,
  RedTitle,
  Typography,
  withBackgroundHoc,
} from "../components";
import { UserController } from "../lib";
import useUser from "../redux/hooks/user";
import { UserActionsTypes } from "../redux/types";

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
  phoneInput: {
    marginBottom: 10,
  },
  flex: {
    flex: 1,
  },
});

function Login() {
  const { setUser } = useUser();
  const [phoneInputValue, setPhoneInputValue] = useState<string>();
  const [isErrored, setIsErrored] = useState<boolean | undefined>(true);

  const handleOnSubmitButtonPress = useCallback(async () => {
    if (phoneInputValue) {
      const loginData = await UserController.userLogin("+7" + phoneInputValue);
      if (loginData) {
        setUser(UserActionsTypes.SET_LOGIN_DATA, { loginData });
      }
    }
  }, [phoneInputValue, setUser]);

  return (
    <View style={styles.container}>
      <RedTitle decorators="all">
        <Typography type={TypographyTypes.BOLD34}>АВТОРИЗАЦИЯ</Typography>
      </RedTitle>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView scrollEnabled={false} style={styles.contentContainer}>
          <BorderedInput
            onChangeText={setPhoneInputValue}
            type="phone-number"
            placeholder="Введите номер телефона"
            onError={setIsErrored}
            style={styles.phoneInput}
            maxLength={14}
          />
          <Button disabled={isErrored} onPress={handleOnSubmitButtonPress}>
            <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
              Продолжить
            </Typography>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(Login);
