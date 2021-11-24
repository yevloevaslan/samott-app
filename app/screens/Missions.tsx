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
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  difficultSelectorContainer: {
    marginBottom: 16,
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
            <Bubble backgroundColor={StyleGuide.colorPalette.white}>
              <View style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
                <Typography
                  type={TypographyTypes.NORMAL18}
                  color={StyleGuide.colorPalette.black}
                >
                  Рейтинг {user.rating}
                </Typography>
              </View>
            </Bubble>
          </View>
        </Header>
      </View>
      <Typography
        type={TypographyTypes.BOLD18}
        textAlign="center"
        numberOfLines={2}
        color={StyleGuide.colorPalette.gray}
        style={styles.helloTitle}
      >
        ДОБРО ПОЖАЛОВАТЬ!{"\n"}МАРШ ВОАГIИЙЛА!
      </Typography>
      <Typography
        textAlign="center"
        type={TypographyTypes.BOLD24}
        color={StyleGuide.colorPalette.gray}
      >
        Выберите уровень обучения
      </Typography>
      <View style={styles.difficultSelectorsContainer}>
        <View style={styles.difficultSelectorContainer}>
          <DifficultSelector
            onPress={handleOnDifficultPress}
            difficult={MissionDifficultType.EASY}
          />
        </View>
        <View style={styles.difficultSelectorContainer}>
          <DifficultSelector
            onPress={handleOnDifficultPress}
            difficult={MissionDifficultType.MEDIUM}
          />
        </View>
        <View style={styles.difficultSelectorContainer}>
          <DifficultSelector
            onPress={handleOnDifficultPress}
            difficult={MissionDifficultType.HARD}
          />
        </View>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES, true)(Missions);
