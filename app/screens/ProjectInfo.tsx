import { StackScreenProps } from "@react-navigation/stack";
import {
  Header,
  LoadingImage,
  Typography,
  withBackgroundHoc,
} from "components";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 31,
    paddingTop: 55,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 51,
  },
  image: {
    aspectRatio: 196 / 218,
    width: 196,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.PROJECT_INFO> {}

function ProjectInfo(props: Props) {
  const { info, title } = props.route.params;

  const handleOnBackButtonPress = useCallback(() => {
    props.navigation.navigate(RoutesNames.SHARE);
  }, [props.navigation]);

  return (
    <View>
      <Header
        onBackButtonPress={handleOnBackButtonPress}
        decorators="right"
        title={title}
        titleType={TypographyTypes.NORMAL18}
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <LoadingImage
            indicatorColor={StyleGuide.colorPalette.black}
            source={{ uri: info.photos[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Typography
          color="#5E4A3C"
          type={TypographyTypes.NORMAL18}
          numberOfLines={undefined}
        >
          {info.description}
        </Typography>
      </View>
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true
)(ProjectInfo);
