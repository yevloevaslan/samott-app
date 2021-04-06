import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { TITLE_DECORATOR } from "../assets/images";
import { StyleGuide } from "../utils";

const styles = StyleSheet.create({
  containerWrapper: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 55,
  },
  withLeftContainerWrapper: {
    paddingRight: 0,
  },
  withRightContainerWrapper: {
    paddingLeft: 0,
  },
  container: {
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    height: 73.5,
    paddingHorizontal: 18,
    backgroundColor: StyleGuide.colorPalette.red,
  },
  decorator: {
    width: 64,
    position: "absolute",
    height: 73.5,
    zIndex: -1,
  },
  left: {
    left: -32,
  },
  right: {
    right: -32,
  },
});

interface Props {
  decorators: "left" | "right" | "all";
  children?: React.ReactNode;
  onPress?: () => void;
}

const Header = (props: Props) => {
  const { decorators, children, onPress } = props;

  const isLeft = useMemo<boolean>(
    () => decorators === "all" || decorators === "left",
    [decorators]
  );

  const isRight = useMemo<boolean>(
    () => decorators === "all" || decorators === "right",
    [decorators]
  );

  const containerWrapperStyle = useMemo<(ViewStyle | false)[]>(() => {
    if (decorators !== "all") {
      if (isLeft) {
        return [styles.containerWrapper, styles.withLeftContainerWrapper];
      }

      if (isRight) {
        return [styles.containerWrapper, styles.withRightContainerWrapper];
      }
    }

    return [styles.containerWrapper];
  }, [decorators, isLeft, isRight]);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={containerWrapperStyle}
    >
      <View style={styles.container}>
        {isLeft && (
          <Image
            source={TITLE_DECORATOR}
            style={[styles.decorator, styles.left]}
          />
        )}
        <View style={styles.contentContainer}>{children}</View>
        {isRight && (
          <Image
            source={TITLE_DECORATOR}
            style={[styles.decorator, styles.right]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Header;
