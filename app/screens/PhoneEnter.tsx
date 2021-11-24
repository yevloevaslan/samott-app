import { StackScreenProps } from "@react-navigation/stack";
import {
  BorderedInput,
  Button,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import UserController from "lib/controllers/UserController";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  TypographyTypes,
} from "utils";

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
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.CODE_ENTER> {}

function PhoneEnter(props: Props) {
  const [inputValue, setInputValue] = useState<string>();
  const [isInputErrored, setIsInputErrored] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChangeText = useCallback((_text?: string, ext?: string) => {
    setInputValue(ext);
  }, []);

  const handleOnSubmitButtonPress = useCallback(async () => {
    if (inputValue) {
      const phone = "+7" + inputValue;
      setIsLoading(true);
      const response = await UserController.userLogin(phone);
      if (response) {
        props.navigation.navigate(RoutesNames.CODE_ENTER, {
          phone,
        });
      }
      setIsLoading(false);
    }
  }, [inputValue, props.navigation]);

  return (
    <View style={styles.container}>
      <Header
        titleType={TypographyTypes.BOLD24}
        title="АВТОРИЗАЦИЯ"
        decorators="all"
        alignTitle="center"
      />
      <View style={styles.contentContainer}>
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
          isLoading={isLoading}
        >
          <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
            Подтвердить
          </Typography>
        </Button>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(PhoneEnter);
