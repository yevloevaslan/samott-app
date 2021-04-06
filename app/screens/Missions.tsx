import React, { useCallback } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";
import {
  Bubble,
  Header,
  Star,
  Typography,
  withBackgroundHoc,
} from "../components";
import { useUser } from "../redux/hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  ratingBubbleContainer: {
    marginLeft: 10,
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
    paddingRight: 40,
    paddingVertical: 20,
  },
  difficultSelector: {
    width: "100%",
    paddingVertical: 22,
    paddingLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 30,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  starsContainer: {
    flexDirection: "row",
  },
  easy: {
    backgroundColor: StyleGuide.colorPalette.mayo,
  },
  medium: {
    backgroundColor: StyleGuide.colorPalette.orange,
  },
  hard: {
    backgroundColor: StyleGuide.colorPalette.tomato,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.MISSIONS> {}

function Missions(props: Props) {
  const {} = props;
  const { user } = useUser();

  const handleOnTitlePress = useCallback(() => {
    props.navigation.navigate(RoutesNames.PROFILE);
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Header
          avatar
          title={user.firstName}
          decorators="right"
          onPress={handleOnTitlePress}
        >
          <View style={styles.ratingBubbleContainer}>
            <Bubble backgroundColor={StyleGuide.colorPalette.mayo}>
              <Typography
                type={TypographyTypes.NORMAL18}
                color={StyleGuide.colorPalette.black}
              >
                Рейтинг 0
              </Typography>
            </Bubble>
          </View>
        </Header>
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
        <TouchableOpacity style={[styles.difficultSelector, styles.easy]}>
          <View style={styles.starsContainer}>
            <Star difficult="easy" />
          </View>
          <Typography type={TypographyTypes.BOLD24}>ЛЕГКИЙ</Typography>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.difficultSelector, styles.medium]}>
          <View style={styles.starsContainer}>
            <Star difficult="middle" />
            <Star difficult="middle" />
          </View>
          <Typography type={TypographyTypes.BOLD24}>СРЕДНИЙ</Typography>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.difficultSelector, styles.hard]}>
          <View style={styles.starsContainer}>
            <Star difficult="hard" />
            <Star difficult="hard" />
            <Star difficult="hard" />
          </View>
          <Typography type={TypographyTypes.BOLD24}>СЛОЖНЫЙ</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES, true)(Missions);
