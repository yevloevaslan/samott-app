import React, { useCallback } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
    paddingTop: 20,
  },
  ornamentDecorator: {
    position: "absolute",
    height: "100%",
    width: 63,
    right: -3,
    bottom: 0,
  },
  backgroundImage: {
    position: "absolute",
  },
});

function withBackgroundHoc(
  image: BackgroundImages,
  withOrnament?: boolean,
  withScroll: boolean = true
): <T extends object>(
  Component: React.ComponentType<T>
) => React.FunctionComponent<T> {
  return <T extends object>(Component: React.ComponentType<T>) => {
    return function (props: T) {
      const renderContent = useCallback(() => {
        if (withScroll) {
          return (
            <KeyboardAvoidingView
              behavior={IS_IOS ? "padding" : "height"}
              style={styles.container}
            >
              <ScrollView
                keyboardShouldPersistTaps="handled"
                bounces={false}
                style={styles.contentContainerWrapper}
                contentContainerStyle={styles.contentContainer}
              >
                <Component {...props} />
              </ScrollView>
            </KeyboardAvoidingView>
          );
        }

        return <Component {...props} />;
      }, [props]);

      return (
        <View style={styles.containerWrapper}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.content}
            imageStyle={styles.backgroundImage}
            source={StyleGuide.backgrounds[image]}
          >
            {renderContent()}
          </ImageBackground>
          {withOrnament && (
            <Image
              resizeMode="cover"
              source={BACKGROUND_ORNAMENT_DECORATOR}
              style={styles.ornamentDecorator}
            />
          )}
        </View>
      );
    };
  };
}

export default withBackgroundHoc;
