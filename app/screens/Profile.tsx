import { useFocusEffect } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import { GEAR_WHEEL, ROTATE_ARROWS } from "assets/images";
import {
  Avatar,
  Button,
  Header,
  LoadingImage,
  Typography,
  withBackgroundHoc,
} from "components";
import { UserController } from "lib";
import MainController from "lib/controllers/MainController";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useApp, usePlayground, useUser } from "redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  SCREEN_WIDTH,
  StyleGuide,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  contentContainerWrapper: {
    flex: 1,
    paddingTop: 20,
  },
  settingsButtonImage: {
    width: 42,
    height: 42,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 21,
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
    paddingHorizontal: 14,
    flex: 1,
    marginRight: 11,
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
    flex: 1,
  },
  updateButtonIcon: {
    width: 40,
    aspectRatio: 1,
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
  rateInfoBubble: {
    paddingVertical: 4,
    backgroundColor: StyleGuide.colorPalette.gray3,
    alignItems: "center",
    borderRadius: 14,
    flex: 1,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.PROFILE> {}

function Profile(props: Props) {
  const { playground } = usePlayground();
  const { app } = useApp();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnGoSettingsPress = useCallback(() => {
    props.navigation.navigate(RoutesNames.PROFILE_SETTINGS, { firstIn: false });
  }, [props.navigation]);

  const handleOnUpdatePress = useCallback(async () => {
    setIsLoading(true);
    await UserController.userGetInfo();
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        MainController.getBanner();
      })();
    }, [])
  );

  const renderBanner = useCallback(() => {
    if (!app.bannerUrl) {
      return null;
    }

    return (
      <View>
        <LoadingImage
          resizeMethod="auto"
          resizeMode="stretch"
          source={{ uri: app.bannerUrl }}
          style={{ width: "100%", aspectRatio: SCREEN_WIDTH / 100 }}
        />
      </View>
    );
  }, [app.bannerUrl]);

  return (
    <>
      {renderBanner()}
      <ScrollView
        style={styles.contentContainerWrapper}
        contentContainerStyle={styles.contentContainer}
      >
        <Header
          justifyContent="space-between"
          title="Профиль"
          decorators="right"
        >
          <TouchableOpacity onPress={handleOnGoSettingsPress}>
            <Image source={GEAR_WHEEL} style={styles.settingsButtonImage} />
          </TouchableOpacity>
        </Header>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Avatar withName size={{ w: 152, h: 149 }} />
          </View>
          <View style={styles.pointsInfoContainer}>
            <View style={[styles.whiteContainer, styles.rateInfoContainer]}>
              <View style={[styles.row, styles.pointsRow]}>
                <Typography
                  style={styles.ratingText}
                  color={StyleGuide.colorPalette.mediumDarkGray}
                >
                  Баллы
                </Typography>
                <View style={styles.rateInfoBubble}>
                  <Typography color={StyleGuide.colorPalette.yellow}>
                    {playground.totalScore}
                  </Typography>
                </View>
              </View>
              <View style={styles.row}>
                <Typography
                  style={styles.ratingText}
                  color={StyleGuide.colorPalette.mediumDarkGray}
                >
                  Рейтинг
                </Typography>
                <View style={styles.rateInfoBubble}>
                  <Typography color={StyleGuide.colorPalette.yellow}>
                    {user.rating}
                  </Typography>
                </View>
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
        </View>
      </ScrollView>
    </>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  false,
  false
)(Profile);
