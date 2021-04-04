import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { BackgroundImages, HomeStackProps, RoutesNames } from "../utils";
import { withBackgroundHoc } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.HOME> {}

function Home(props: Props) {
  const {} = props;
  return <View style={styles.container} />;
}

export default withBackgroundHoc(BackgroundImages.WITH_CASTLES, true)(Home);
