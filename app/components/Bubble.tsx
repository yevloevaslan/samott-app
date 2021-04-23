import { Typography } from "components";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TypographyTypes, StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderRadius: 18,
  },
  headerContainer: {
    marginBottom: 8,
    padding: 5,
  },
  bubbleArrow: {
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: StyleGuide.colorPalette.transparent,
    borderStyle: "solid",
    borderTopWidth: 0,
    borderTopColor: StyleGuide.colorPalette.transparent,
    borderRightColor: StyleGuide.colorPalette.transparent,
    borderLeftColor: StyleGuide.colorPalette.transparent,
    borderBottomWidth: 18,
    zIndex: -1,
  },
  leftArrow: {
    left: -28,
    borderRightWidth: 10,
    borderLeftWidth: 37,
  },
  rightArrow: {
    right: -28,
    borderRightWidth: 37,
    borderLeftWidth: 10,
  },
});

interface Props {
  title?: string;
  titleType?: TypographyTypes;
  from?: "left" | "right";
  backgroundColor?: string;
  children?: React.ReactFragment;
  titleAlign?: "left" | "right" | "center";
}

const Bubble = (props: Props) => {
  const {
    title,
    backgroundColor = StyleGuide.colorPalette.orange,
    titleType = TypographyTypes.NORMAL500,
    children,
    from,
    titleAlign = "center",
  } = props;

  const containerStyle = useMemo<ViewStyle[]>(
    () => [styles.container, { backgroundColor }],
    [backgroundColor]
  );

  const arrowStyle = useMemo(
    () => [
      styles.bubbleArrow,
      from === "left" && styles.leftArrow,
      from === "right" && styles.rightArrow,
      { borderBottomColor: backgroundColor },
    ],
    [backgroundColor, from]
  );

  return (
    <View style={containerStyle}>
      {title && (
        <View style={styles.headerContainer}>
          <Typography textAlign={titleAlign} numberOfLines={2} type={titleType}>
            {title}
          </Typography>
        </View>
      )}
      {children}
      {from === "left" && <View style={arrowStyle} />}
      {from === "right" && <View style={arrowStyle} />}
    </View>
  );
};

export default Bubble;
