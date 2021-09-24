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
    flexWrap: "wrap",
  },
  contentContainer: {
    flex: 1,
    height: 73.5,
    paddingHorizontal: 18,
    flexDirection: "row",
    backgroundColor: StyleGuide.colorPalette.red,
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
    marginLeft: 10,
  },
  right: {
    right: -32,
  },
  leftContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexWrap: "wrap",
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
      return <Avatar />;
    } else if (onBackButtonPress) {
      return <BackButton onPress={handleOnBackButtonPress} />;
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
          <View style={styles.leftContentContainer}>
            <Typography
              numberOfLines={1}
              type={titleType}
              style={styles.titleText}
            >
              {title}
            </Typography>
            {children}
          </View>
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
