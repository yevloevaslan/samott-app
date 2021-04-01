import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  TypographyTypes,
} from "../utils";
import {
  BorderedInput,
  Button,
  RedTitle,
  Typography,
  withBackgroundHoc,
} from "../components";

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

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.LOGIN> {}

function Login(props: Props) {
  const {} = props;
  const [phoneInputValue, setPhoneInputValue] = useState<string>("");
  const [isErrored, setIsErrored] = useState<boolean | undefined>(false);

  const handleOnSubmitButtonPress = useCallback(() => {}, []);

  const handleInputError = useCallback((errored?: boolean) => {
    setIsErrored(errored);
  }, []);

  return (
    <View style={styles.container}>
      <RedTitle decorators="all">
        <Typography type={TypographyTypes.BOLD34}>АВТОРИЗАЦИЯ</Typography>
      </RedTitle>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView scrollEnabled={false} style={styles.contentContainer}>
          <BorderedInput
            value={phoneInputValue}
            onChangeText={setPhoneInputValue}
            type="phone-number"
            placeholder="Введите номер телефона"
            onError={handleInputError}
            style={styles.phoneInput}
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
