import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BorderedInput,
  Bubble,
  Button,
  DatePicker,
  RadioButton,
  Typography,
  withBackgroundHoc,
} from "../components";
import { UserController } from "../lib";
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
  const [isErrored, setIsErrored] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();
  const [isDatePicker, setIsDatePicker] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleOnAcceptButtonPress = useCallback(async () => {
    if (lastName && middleName && firstName && birthday) {
      const userInfo = {
        lastName,
        middleName,
        firstName,
        email,
        birthday,
      };
      if (!email?.match(/^[a-z]*@[a-z]*.[a-z]*$/)) {
        delete userInfo.email;
      }
      setIsLoading(true);
      userController.userPutInfo(userInfo).then(async () => {
        await userController.userGetInfo();
        props.navigation.navigate(RoutesNames.PIN_PHOTO);
      });
      setIsLoading(false);
    }
  }, [
    birthday,
    email,
    firstName,
    lastName,
    middleName,
    props.navigation,
    userController,
  ]);

  const handleOnChangeBirthDay = useCallback(
    (date?: Date) => {
      setBirthday(date ? date : birthday);
      setIsDatePicker(false);
    },
    [birthday]
  );

  const handleOnOpenPicker = useCallback(() => {
    setIsDatePicker(true);
  }, []);

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
        <DatePicker
          onChange={handleOnChangeBirthDay}
          onOpen={handleOnOpenPicker}
          value={birthday}
          isPicker={isDatePicker}
        />
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
      <Button
        isLoading={isLoading}
        onPress={handleOnAcceptButtonPress}
        disabled={isErrored}
      >
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
