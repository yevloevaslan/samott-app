import React from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_ORNAMENT_DECORATOR } from "../assets/images";
import { BackgroundImages, IS_IOS, StyleGuide } from "../utils";

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainerWrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  ornamentDecorator: {
    position: "absolute",
    height: "100%",
    width: 63,
    right: -3,
    bottom: 0,
  },
});

function withBackgroundHoc(
  image: BackgroundImages,
  withOrnament?: boolean
): <T extends object>(
  Component: React.ComponentType<T>
) => React.FunctionComponent<T> {
  return <T extends object>(Component: React.ComponentType<T>) => {
    return function (props: T) {
      return (
        <SafeAreaView style={styles.containerWrapper}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.content}
            source={StyleGuide.backgrounds[image]}
          >
            <KeyboardAvoidingView
              behavior={IS_IOS ? "padding" : "height"}
              style={styles.container}
            >
              <ScrollView
                bounces={false}
                style={styles.contentContainerWrapper}
                contentContainerStyle={styles.contentContainer}
              >
                <Component {...props} />
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
          {withOrnament && (
            <Image
              resizeMode="cover"
              source={BACKGROUND_ORNAMENT_DECORATOR}
              style={styles.ornamentDecorator}
            />
          )}
        </SafeAreaView>
      );
    };
  };
}

export default withBackgroundHoc;
