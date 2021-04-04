import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";
import {
  Avatar,
  Bubble,
  DifficultSelector,
  RedTitle,
  Typography,
  withBackgroundHoc,
} from "../components";
import { useUser } from "../redux/hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  titleContetContainer: {
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    marginHorizontal: 13,
  },
  titleContainer: {
    marginBottom: 32,
  },
  helloTitle: {
    marginBottom: 10,
  },
  difficultSelectorsContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 97,
    paddingVertical: 32,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.MISSIONS> {}

function Missions(props: Props) {
  const {} = props;
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <RedTitle decorators="right">
          <View style={styles.titleContetContainer}>
            <Avatar />
            <Typography style={styles.nameText}>{user.firstName}</Typography>
            <Bubble backgroundColor={StyleGuide.colorPalette.mayo}>
              <Typography
                type={TypographyTypes.NORMAL18}
                color={StyleGuide.colorPalette.black}
              >
                Рейтинг 0
              </Typography>
            </Bubble>
          </View>
        </RedTitle>
      </View>
      <Typography
        type={TypographyTypes.BOLD24}
        textAlign="center"
        numberOfLines={2}
        color={StyleGuide.colorPalette.darkGreen}
        style={styles.helloTitle}
      >
        ДОБРО ПОЖАЛОВАТЬ!{"\n"}МАРШ ВОАГIИЙЛА!
      </Typography>
      <Typography
        textAlign="center"
        type={TypographyTypes.BOLD24}
        color={StyleGuide.colorPalette.darkBrown}
      >
        Выберите уровень обучения
      </Typography>
      <View style={styles.difficultSelectorsContainer}>
        <DifficultSelector difficult="easy" />
        <DifficultSelector difficult="middle" />
        <DifficultSelector difficult="hard" />
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES, true)(Missions);
