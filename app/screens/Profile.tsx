import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GEAR_WHEEL, RED_STAR, ROTATE_ARROWS } from "../assets/images";
import {
  Avatar,
  BackButton,
  Bubble,
  Button,
  DifficultSelector,
  Header,
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
    paddingTop: 48,
  },
  titleContentContainer: {
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "space-between",
  },
  titleTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    marginLeft: 10,
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
    flexDirection: "row",
    marginLeft: -10,
    justifyContent: "space-between",
  },
  easyCounter: {
    backgroundColor: StyleGuide.colorPalette.mayo,
  },
  middleCounter: {
    backgroundColor: StyleGuide.colorPalette.orange,
  },
  hardCounter: {
    backgroundColor: StyleGuide.colorPalette.tomato,
  },
  missionStatusTitleText: {
    marginBottom: 20,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.PROFILE> {}

function Profile(props: Props) {
  const userController = UserController();
  const handleOnGoSettingsPress = useCallback(() => {
    props.navigation.navigate(RoutesNames.PROFILE_SETTINGS);
  }, [props.navigation]);

  const handleOnUpdatePress = useCallback(async () => {
    await userController.userGetInfo();
  }, [userController]);

  return (
    <View style={styles.container}>
      <Header decorators="right">
        <View style={styles.titleContentContainer}>
          <View style={styles.titleTextContainer}>
            <BackButton navigation={props.navigation} />
            <Typography style={styles.titleText}>Профиль</Typography>
          </View>
          <TouchableOpacity onPress={handleOnGoSettingsPress}>
            <Image source={GEAR_WHEEL} style={styles.settingsButtonImage} />
          </TouchableOpacity>
        </View>
      </Header>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Avatar withName size={{ w: 152, h: 149 }} />
        </View>
        <View style={styles.pointsInfoContainer}>
          <View style={[styles.whiteContainer, styles.rateInfoContainer]}>
            <View style={[styles.row, styles.pointsRow]}>
              <Typography color={StyleGuide.colorPalette.darkGray}>
                Баллы
              </Typography>
              <Bubble backgroundColor={StyleGuide.colorPalette.darkGreen}>
                <Typography color={StyleGuide.colorPalette.acidGreen}>
                  0
                </Typography>
              </Bubble>
            </View>
            <View style={styles.row}>
              <Typography
                style={styles.ratingText}
                color={StyleGuide.colorPalette.darkGray}
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
            <Button style={styles.updateButton} onPress={handleOnUpdatePress}>
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
              color={StyleGuide.colorPalette.darkGray}
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
            color={StyleGuide.colorPalette.darkGray}
          >
            Выполнено заданий
          </Typography>
          <View style={styles.difficultContainer}>
            <DifficultSelector difficult="easy" />
            <View style={[styles.starContainer, styles.easyCounter]}>
              <Typography>0</Typography>
            </View>
          </View>
          <View style={styles.difficultContainer}>
            <DifficultSelector difficult="middle" />
            <View style={[styles.starContainer, styles.middleCounter]}>
              <Typography>0</Typography>
            </View>
          </View>
          <View style={styles.difficultContainer}>
            <DifficultSelector difficult="hard" />
            <View style={[styles.starContainer, styles.hardCounter]}>
              <Typography>0</Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES)(Profile);