import { StackScreenProps } from "@react-navigation/stack";
import {
  Alert,
  Button,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import MainController from "lib/controllers/MainController";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Share,
  StyleSheet,
  View,
} from "react-native";
import { useEffectAsync } from "react-native-text-input-mask";
import {
  APP_STORE_APP_URL,
  BackgroundImages,
  GOOGLE_PLAY_APP_URL,
  HomeStackProps,
  IAboutProject,
  IProject,
  IS_IOS,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "space-around",
    paddingTop: 97,
    paddingBottom: 40,
  },
  navigationBtn: {
    paddingVertical: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: StyleGuide.colorPalette.green,
    borderRadius: 7,
    marginBottom: 20,
  },
  containerWrapper: {
    paddingTop: 29,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.SHARE> {}

function ShareScreen(props: Props) {
  const {} = props;
  const [aboutProject, setAboutProject] = useState<
    Omit<IAboutProject, "banner">
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);

  useEffectAsync(async () => {
    setIsLoading(true);
    const response = await MainController.getAboutProject();
    if (response) {
      setAboutProject(response);
    }
    setIsLoading(false);
  }, []);

  const handleOnGoToInfo = useCallback(
    (title: string, info?: IProject) => {
      if (info) {
        props.navigation.navigate(RoutesNames.PROJECT_INFO, { info, title });
      }
    },
    [props.navigation]
  );

  const handleOnGoToMain = useCallback(() => {
    handleOnGoToInfo("О приложении SaMott", aboutProject?.project);
  }, [aboutProject?.project, handleOnGoToInfo]);

  const handleOnGoToAuthor = useCallback(() => {
    handleOnGoToInfo("Автор проекта", aboutProject?.author);
  }, [aboutProject?.author, handleOnGoToInfo]);

  const goToMarket = useCallback(async () => {
    const link = IS_IOS ? APP_STORE_APP_URL : GOOGLE_PLAY_APP_URL;
    try {
      const res = await Linking.canOpenURL(link);
      if (res) {
        Linking.openURL(link);
        setIsAlertVisible((prev) => !prev);
      }
    } catch (e) {}
  }, []);

  const toggleModal = useCallback(() => {
    setIsAlertVisible((prev) => !prev);
  }, []);

  const handleOnShareBtnPress = useCallback(() => {
    Share.share({
      message:
        "Выучи Ингушский язык с помощью задач!\n" +
        Platform.select({
          ios: APP_STORE_APP_URL,
          android: GOOGLE_PLAY_APP_URL,
        }),
      url: Platform.select({
        ios: APP_STORE_APP_URL,
        android: GOOGLE_PLAY_APP_URL,
      }),
    });
  }, []);

  return (
    <View style={styles.containerWrapper}>
      <Header title="Поделиться" decorators="right" />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button onPress={handleOnGoToMain} style={styles.navigationBtn}>
              <Typography type={TypographyTypes.BOLD24}>
                О приложении SaMott
              </Typography>
            </Button>
            <Button onPress={handleOnGoToAuthor} style={styles.navigationBtn}>
              <Typography type={TypographyTypes.BOLD24}>
                Автор проекта
              </Typography>
            </Button>
            <Button onPress={toggleModal} style={styles.navigationBtn}>
              <Typography type={TypographyTypes.BOLD24}>Оценить</Typography>
            </Button>
            <Button onPress={goToMarket} style={styles.navigationBtn}>
              <Typography type={TypographyTypes.BOLD24}>
                Написать нам
              </Typography>
            </Button>
            <Button
              onPress={handleOnShareBtnPress}
              style={styles.navigationBtn}
            >
              <Typography type={TypographyTypes.BOLD24}>Поделиться</Typography>
            </Button>
          </>
        )}
      </View>
      <Alert
        title="Перейти в магазин"
        visible={isAlertVisible}
        buttons={[
          { text: "Перейти", onPress: goToMarket },
          { text: "Отмена", onPress: toggleModal },
        ]}
      />
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true
)(ShareScreen);
