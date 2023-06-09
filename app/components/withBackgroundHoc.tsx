import React, { useCallback } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundImages, IS_IOS, StyleGuide } from "../utils";

const styles = StyleSheet.create({
  containerWrapper: {
    flexGrow: 1,
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
    // paddingTop: 20,
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
              behavior={IS_IOS ? "padding" : undefined}
              style={styles.container}
              keyboardVerticalOffset={IS_IOS ? 50 : 0}
            >
              <ScrollView
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
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
        <SafeAreaView edges={["top"]} style={styles.containerWrapper}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.content}
            imageStyle={styles.backgroundImage}
            source={StyleGuide.backgrounds[image]}
          >
            {renderContent()}
          </ImageBackground>
        </SafeAreaView>
      );
    };
  };
}

export default withBackgroundHoc;
