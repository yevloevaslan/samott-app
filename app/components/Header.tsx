import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Avatar, BackButton, Typography } from ".";
import { TITLE_DECORATOR } from "../assets/images";
import {
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";

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
  },
});

interface Props {
  decorators: "left" | "right" | "all";
  children?: React.ReactNode;
  avatar?: boolean;
  title: string;
  onPress?: () => void;
  navigation?: StackNavigationProp<HomeStackProps, RoutesNames>;
  justifyContent?: "space-between" | "space-around" | "space-evenly";
  titleType?: TypographyTypes;
}

const Header = (props: Props) => {
  const {
    decorators,
    children,
    onPress,
    avatar,
    title,
    navigation,
    justifyContent = "flex-start",
    titleType,
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

  const renderLeft = useCallback(() => {
    if (avatar) {
      return <Avatar />;
    } else if (navigation) {
      return <BackButton navigation={navigation} />;
    }

    return null;
  }, [avatar, navigation]);

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
          <View style={styles.leftContentContainer}>
            {renderLeft()}
            <Typography type={titleType} style={styles.titleText}>
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
