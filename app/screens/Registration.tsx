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
import { BackgroundImages, StyleGuide, TypographyTypes } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingRight: 27,
    paddingTop: 20,
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

function Registration() {
  const [isErrored, setIsErrored] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [secondName, setSecondName] = useState<string>();
  const [thirdName, setThirdName] = useState<string>();
  const [birthdayDay, setBirthdayDay] = useState<number>();
  const [birthdayMonth, setBirthdayMonth] = useState<number>();
  const [birthdayYear, setBirthdayYear] = useState<number>();
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>();

  const isAllInputsDone = useMemo(
    () =>
      Boolean(
        name &&
          secondName &&
          thirdName &&
          birthdayDay &&
          birthdayMonth &&
          birthdayYear &&
          isTermsAccepted
      ),
    [
      birthdayDay,
      birthdayMonth,
      birthdayYear,
      isTermsAccepted,
      name,
      secondName,
      thirdName,
    ]
  );

  useEffect(() => {
    if (isAllInputsDone) {
      setIsErrored(false);
    }
    setIsErrored(true);
  }, [isAllInputsDone]);

  const handleOnAgreePress = useCallback((isSetted?: boolean) => {
    setIsTermsAccepted(isSetted);
  }, []);

  const handleOnChangeDay = useCallback((text?: string) => {
    setBirthdayDay(Number(text));
  }, []);

  const handleOnChangeMonth = useCallback((text?: string) => {
    setBirthdayMonth(Number(text));
  }, []);

  const handleOnChangeYear = useCallback((text?: string) => {
    setBirthdayYear(Number(text));
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
        onChangeText={setName}
        style={styles.inputStyle}
        placeholder="Имя"
      />
      <BorderedInput
        onChangeText={setSecondName}
        style={styles.inputStyle}
        placeholder="Фамилия"
      />
      <BorderedInput
        onChangeText={setThirdName}
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
      <BorderedInput type="email" placeholder="Email (необязательно)" />
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
      <Button disabled={isErrored}>
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
