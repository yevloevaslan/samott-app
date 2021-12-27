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
import { Alert, StyleSheet, View } from "react-native";
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
  const [isInputErrored, setIsInputErrored] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmitButtonPress = useCallback(async () => {
    if (inputValue) {
      if (
        !inputValue.match(
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        )?.length
      ) {
        Alert.alert("Не правильный формат почты");
        return;
      }
      setIsLoading(true);
      const response = await UserController.userLogin(inputValue);
      if (response) {
        props.navigation.navigate(RoutesNames.CODE_ENTER, {
          email: inputValue,
        });
      }
      setIsLoading(false);
    }
  }, [inputValue, props.navigation]);

  return (
    <View style={styles.container}>
      <Header
        titleType={TypographyTypes.BOLD18}
        title="АВТОРИЗАЦИЯ"
        decorators="all"
        alignTitle="center"
      />
      <View style={styles.contentContainer}>
        <BorderedInput
          onChangeText={setInputValue}
          type="email"
          placeholder="Введите адрес почты"
          onError={setIsInputErrored}
          style={styles.phoneInput}
        />
        <Button
          style={styles.submitButton}
          disabled={isInputErrored}
          onPress={handleOnSubmitButtonPress}
          isLoading={isLoading}
        >
          <Typography textAlign="center" type={TypographyTypes.NORMAL18}>
            Подтвердить
          </Typography>
        </Button>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(PhoneEnter);
