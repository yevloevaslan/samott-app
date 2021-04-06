import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  BorderedInput,
  RedTitle,
  Typography,
  withBackgroundHoc,
} from "../components";
import { BackgroundImages, HomeStackProps, TypographyTypes } from "../utils";
import UserController from "../lib/controllers/UserController";
import { StackScreenProps } from "@react-navigation/stack";
import { RoutesNames } from "../utils/enums";

const styles = StyleSheet.create({
  submitButton: {},
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
  flex: {
    flex: 1,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.CODE_ENTER> {}

function PhoneEnter(props: Props) {
  const userController = UserController();
  const [inputValue, setInputValue] = useState<string>();
  const [isInputErrored, setIsInputErrored] = useState<boolean>(true);

  const handleOnChangeText = useCallback((_text?: string, ext?: string) => {
    setInputValue(ext);
  }, []);

  const handleOnSubmitButtonPress = useCallback(async () => {
    if (inputValue) {
      const phone = "+7" + inputValue;
      const response = await userController.userLogin(phone);
      if (response) {
        props.navigation.navigate(RoutesNames.CODE_ENTER, {
          phone,
        });
      }
    }
  }, [inputValue, props.navigation, userController]);

  return (
    <View style={styles.container}>
      <RedTitle decorators="all">
        <Typography type={TypographyTypes.BOLD34}>АВТОРИЗАЦИЯ</Typography>
      </RedTitle>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView scrollEnabled={false} style={styles.contentContainer}>
          <BorderedInput
            onChangeText={handleOnChangeText}
            type="phone-number"
            placeholder="Введите номер телефона"
            onError={setIsInputErrored}
            style={styles.phoneInput}
            maxLength={14}
          />
          <Button
            style={styles.submitButton}
            disabled={isInputErrored}
            onPress={handleOnSubmitButtonPress}
          >
            <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
              Подтвердить
            </Typography>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(PhoneEnter);
