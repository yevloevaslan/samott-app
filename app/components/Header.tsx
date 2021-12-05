import { TITLE_DECORATOR } from "assets/images";
import { Avatar, BackButton, Typography } from "components";
import React, { useCallback, useMemo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

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
    flexDirection: "row",
    backgroundColor: StyleGuide.colorPalette.green,
    alignItems: "center",
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
  titleText: {
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 24,
  },
  right: {
    right: -32,
  },
  leftContentContainer: {
    alignItems: "center",
    flex: 1,
  },
  leftContainer: {
    marginRight: 10,
  },
});

interface Props {
  decorators: "left" | "right" | "all";
  children?: React.ReactNode;
  avatar?: boolean;
  title: string;
  onPress?: () => void;
  justifyContent?: "space-between" | "space-around" | "space-evenly";
  titleType?: TypographyTypes;
  onBackButtonPress?: () => void;
  titleScale?: boolean;
  alignTitle?: "center" | "flex-start";
}

const Header = (props: Props) => {
  const {
    decorators,
    children,
    onPress,
    avatar,
    title,
    justifyContent = "flex-start",
    titleType,
    onBackButtonPress,
    alignTitle = "flex-start",
  } = props;

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

  const handleOnBackButtonPress = useCallback(() => {
    if (onBackButtonPress) {
      onBackButtonPress();
    }
  }, [onBackButtonPress]);

  const renderLeft = useCallback(() => {
    if (avatar) {
      return (
        <View style={styles.leftContainer}>
          <Avatar size={{ w: 50, h: 50 }} />
        </View>
      );
    } else if (onBackButtonPress) {
      return (
        <View style={styles.leftContainer}>
          <BackButton onPress={handleOnBackButtonPress} />
        </View>
      );
    }

    return null;
  }, [avatar, handleOnBackButtonPress, onBackButtonPress]);

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
        <View style={[styles.contentContainer, { justifyContent }]}>
          {renderLeft()}
          <View
            style={[styles.leftContentContainer, { alignItems: alignTitle }]}
          >
            <Typography
              numberOfLines={1}
              type={titleType}
              style={styles.titleText}
              allowFontScaling={true}
            >
              {title}
            </Typography>
          </View>
          {children}
        </View>
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
