import React, { useCallback } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import {
  BackgroundImages,
  HomeStackProps,
  MissionDifficultType,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";
import {
  Bubble,
  DifficultSelector,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import { useUser, usePlayground, useApp } from "redux/hooks";

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
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.MISSIONS> {}

function Missions(props: Props) {
  const {} = props;
  const { user } = useUser();
  const { setIsPlaying } = useApp();
  const { playground } = usePlayground();
  const { setCurrentDifficult } = usePlayground();

  const handleOnTitlePress = useCallback(() => {
    props.navigation.navigate(RoutesNames.PROFILE);
  }, [props.navigation]);

  const handleOnDifficultPress = useCallback(
    (difficult: MissionDifficultType) => {
      setIsPlaying(true);
      setCurrentDifficult(difficult);
      props.navigation.navigate(RoutesNames.MISSIONS_PLAYGROUND);
    },
    [props.navigation, setCurrentDifficult, setIsPlaying]
  );

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
                Рейтинг {playground.totalScore}
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
        <DifficultSelector
          onPress={handleOnDifficultPress}
          difficult={MissionDifficultType.EASY}
        />
        <DifficultSelector
          onPress={handleOnDifficultPress}
          difficult={MissionDifficultType.MEDIUM}
        />
        <DifficultSelector
          onPress={handleOnDifficultPress}
          difficult={MissionDifficultType.HARD}
        />
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES, true)(Missions);
