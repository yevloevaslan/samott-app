import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundImages, StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.colorPalette.white,
  },
});

function withBackgroundHoc(
  image: BackgroundImages
): <T extends object>(
  Component: React.ComponentType<T>
) => React.FunctionComponent<T> {
  return <T extends object>(Component: React.ComponentType<T>) => {
    return function (props: T) {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={styles.container}
            source={StyleGuide.backgrounds[image]}
          >
            <Component {...props} />
          </ImageBackground>
        </SafeAreaView>
      );
    };
  };
}

export default withBackgroundHoc;
