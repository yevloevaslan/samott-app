import { StackScreenProps } from "@react-navigation/stack";
import {
  Bubble,
  DifficultSelector,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useApp, usePlayground, useUser } from "redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  MissionDifficultType,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";

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
  const { setCurrentDifficult } = usePlayground();

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
        <Header avatar title={user.firstName} decorators="right">
          <View style={styles.ratingBubbleContainer}>
            <Bubble backgroundColor={StyleGuide.colorPalette.mayo}>
              <Typography
                type={TypographyTypes.NORMAL18}
                color={StyleGuide.colorPalette.black}
              >
                Рейтинг {user.rating}
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
