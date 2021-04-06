import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BorderedInput,
  Bubble,
  Button,
  RadioButton,
  Typography,
  withBackgroundHoc,
} from "../components";
import { useArray } from "../hooks";
import { UserController } from "../lib";
import { useUser } from "../redux/hooks";
import { UserActionsTypes } from "../redux/types";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingRight: 27,
    paddingTop: 20,
    paddingBottom: 20,
  },
  helloBubbleContainer: {
    marginBottom: 50,
  },
  inputStyle: {
    marginBottom: 15,
  },
  birthdayContainer: {
    marginBottom: 20,
  },
  birthdayInputsContainerTitle: {
    marginBottom: 30,
  },
  birthdayInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  termsOfUseButtonContainer: {
    marginVertical: 32,
    paddingLeft: 17,
  },
  termsOfUseText: {
    width: "100%",
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.REGISTRATION> {}

function Registration(props: Props) {
  const userController = UserController();
  const { setUser } = useUser();
  const [isErrored, setIsErrored] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const birthday = useArray<number>([0, 0, 0]);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>();

  const isAllInputsDone = useMemo(
    () =>
      Boolean(
        firstName && middleName && lastName && birthday && isTermsAccepted
      ),
    [birthday, firstName, middleName, lastName, isTermsAccepted]
  );

  useEffect(() => {
    setIsErrored(!isAllInputsDone);
  }, [isAllInputsDone]);

  const handleOnAgreePress = useCallback(setIsTermsAccepted, [
    setIsTermsAccepted,
  ]);

  const handleOnChangeDay = useCallback(
    (text?: string) => {
      birthday.setAt(0, Number(text));
    },
    [birthday]
  );

  const handleOnChangeMonth = useCallback(
    (text?: string) => {
      birthday.setAt(1, Number(text));
    },
    [birthday]
  );

  const handleOnChangeYear = useCallback(
    (text?: string) => {
      birthday.setAt(2, Number(text));
    },
    [birthday]
  );

  const handleOnAcceptButtonPress = useCallback(async () => {
    const birth = birthday.get();
    if (lastName && middleName && firstName && birth) {
      const userInfo = {
        lastName,
        middleName,
        firstName,
        email,
        birthday: new Date(birth[2], birth[1], birth[0]),
      };
      if (!email?.match(/^[a-z]*@[a-z]*.[a-z]*$/)) {
        delete userInfo.email;
      }
      userController.userPutInfo(userInfo).then(() => {
        setUser(UserActionsTypes.SET_NAME, userInfo);
        props.navigation.navigate(RoutesNames.PIN_PHOTO);
      });
    }
  }, [
    birthday,
    email,
    firstName,
    lastName,
    middleName,
    props.navigation,
    setUser,
    userController,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.helloBubbleContainer}>
        <Bubble
          backgroundColor={StyleGuide.colorPalette.green}
          from="left"
          titleType={TypographyTypes.BOLD34}
          titleAlign="left"
          title={"ДАВАЙТЕ\nПОЗНАКОМИМСЯ!"}
        />
      </View>
      <BorderedInput
        onChangeText={setFirstName}
        style={styles.inputStyle}
        placeholder="Имя"
      />
      <BorderedInput
        onChangeText={setMiddleName}
        style={styles.inputStyle}
        placeholder="Фамилия"
      />
      <BorderedInput
        onChangeText={setLastName}
        style={styles.inputStyle}
        placeholder="Отчество"
      />
      <View style={styles.birthdayContainer}>
        <Typography
          color={StyleGuide.colorPalette.gray}
          type={TypographyTypes.NORMAL24}
          style={styles.birthdayInputsContainerTitle}
        >
          Дата рождения
        </Typography>
        <View style={styles.birthdayInputsContainer}>
          <BorderedInput
            textAlign="center"
            type="numbers-only"
            onChangeText={handleOnChangeDay}
            maxLength={2}
            style={styles.inputStyle}
            placeholder="ДД"
          />
          <BorderedInput
            textAlign="center"
            type="numbers-only"
            maxLength={2}
            onChangeText={handleOnChangeMonth}
            style={styles.inputStyle}
            placeholder="ММ"
          />
          <BorderedInput
            textAlign="center"
            type="numbers-only"
            maxLength={4}
            onChangeText={handleOnChangeYear}
            style={styles.inputStyle}
            placeholder="ГГГГ"
          />
        </View>
      </View>
      <BorderedInput
        onChangeText={setEmail}
        type="email"
        placeholder="Email (необязательно)"
      />
      <View style={styles.termsOfUseButtonContainer}>
        <RadioButton onPress={handleOnAgreePress}>
          <Typography
            color={StyleGuide.colorPalette.gray}
            type={TypographyTypes.NORMAL14}
            textAlign="left"
            numberOfLines={2}
            style={styles.termsOfUseText}
          >
            Даю согласие на обработку моих{"\n"}персональных данных
          </Typography>
        </RadioButton>
      </View>
      <Button onPress={handleOnAcceptButtonPress} disabled={isErrored}>
        <Typography textAlign="center" type={TypographyTypes.NORMAL24}>
          Продолжить
        </Typography>
      </Button>
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_ORNAMENTS,
  true
)(Registration);
