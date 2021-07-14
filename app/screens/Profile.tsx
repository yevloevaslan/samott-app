import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GEAR_WHEEL, RED_STAR, ROTATE_ARROWS } from "assets/images";
import {
  Avatar,
  Bubble,
  Button,
  DifficultSelector,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import { UserController } from "lib";
import {
  BackgroundImages,
  HomeStackProps,
  MissionDifficultType,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";
import { usePlayground } from "redux/hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  settingsButtonImage: {
    width: 42,
    height: 42,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 21,
    paddingBottom: 20,
  },
  whiteContainer: {
    borderRadius: 7,
    backgroundColor: StyleGuide.colorPalette.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateInfoContainer: {
    justifyContent: "space-around",
    paddingHorizontal: 24,
  },
  pointsRow: {
    marginBottom: 10,
  },
  pointsInfoContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ratingText: {
    marginRight: 18,
  },
  updateButtonIcon: {
    width: 34,
    height: 34,
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
  },
  updateButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: StyleGuide.colorPalette.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  updateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  currentRatingContainer: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  starContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: StyleGuide.colorPalette.mayo,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    width: 24,
    height: 24,
  },
  currentRatingText: {
    marginRight: 10,
    paddingTop: 7,
  },
  missionsStatusContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 24,
  },
  difficultContainer: {
    marginBottom: 10,
  },
  difficultsContainer: {
    flex: 1,
    marginLeft: -10,
  },
  missionStatusTitleText: {
    marginBottom: 20,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.PROFILE> {}

function Profile(props: Props) {
  const { playground } = usePlayground();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnGoSettingsPress = useCallback(() => {
    props.navigation.navigate(RoutesNames.PROFILE_SETTINGS, { firstIn: false });
  }, [props.navigation]);

  const handleOnUpdatePress = useCallback(async () => {
    setIsLoading(true);
    await UserController.userGetInfo();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Header justifyContent="space-between" title="Профиль" decorators="right">
        <TouchableOpacity onPress={handleOnGoSettingsPress}>
          <Image source={GEAR_WHEEL} style={styles.settingsButtonImage} />
        </TouchableOpacity>
      </Header>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Avatar withName size={{ w: 152, h: 149 }} />
        </View>
        <View style={styles.pointsInfoContainer}>
          <View style={[styles.whiteContainer, styles.rateInfoContainer]}>
            <View style={[styles.row, styles.pointsRow]}>
              <Typography color={StyleGuide.colorPalette.mediumDarkGray}>
                Баллы
              </Typography>
              <Bubble backgroundColor={StyleGuide.colorPalette.darkGreen}>
                <Typography color={StyleGuide.colorPalette.acidGreen}>
                  {playground.totalScore}
                </Typography>
              </Bubble>
            </View>
            <View style={styles.row}>
              <Typography
                style={styles.ratingText}
                color={StyleGuide.colorPalette.mediumDarkGray}
              >
                Рейтинг
              </Typography>
              <Bubble backgroundColor={StyleGuide.colorPalette.darkGreen}>
                <Typography color={StyleGuide.colorPalette.acidGreen}>
                  0
                </Typography>
              </Bubble>
            </View>
          </View>
          <View style={[styles.whiteContainer, styles.updateContainer]}>
            <Button
              isLoading={isLoading}
              style={styles.updateButton}
              onPress={handleOnUpdatePress}
            >
              <Image source={ROTATE_ARROWS} style={styles.updateButtonIcon} />
            </Button>
            <Typography
              color={StyleGuide.colorPalette.darkBlue}
              type={TypographyTypes.NORMAL18}
              numberOfLines={2}
              textAlign="center"
            >
              Обновить{"\n"}данные
            </Typography>
          </View>
        </View>
        <View style={[styles.whiteContainer, styles.currentRatingContainer]}>
          <View style={styles.row}>
            <Typography
              color={StyleGuide.colorPalette.mediumDarkGray}
              type={TypographyTypes.NORMAL24}
              style={styles.currentRatingText}
            >
              Текущий уровень
            </Typography>
            <View style={styles.starContainer}>
              <View style={styles.starContainer}>
                <Image source={RED_STAR} style={styles.star} />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.whiteContainer, styles.missionsStatusContainer]}>
          <Typography
            style={styles.missionStatusTitleText}
            color={StyleGuide.colorPalette.mediumDarkGray}
          >
            Выполнено заданий
          </Typography>
          <View style={styles.difficultsContainer}>
            <View style={styles.difficultContainer}>
              <DifficultSelector
                score={playground.easyLevelScore}
                difficult={MissionDifficultType.EASY}
              />
            </View>
            <View style={styles.difficultContainer}>
              <DifficultSelector
                score={playground.mediumLevelScore}
                difficult={MissionDifficultType.MEDIUM}
              />
            </View>
            <View style={styles.difficultContainer}>
              <DifficultSelector
                score={playground.hardLevelScore}
                difficult={MissionDifficultType.HARD}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(Profile);
