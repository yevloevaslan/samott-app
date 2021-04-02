import React, { useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TypographyTypes } from "../utils";
import Typography from "./Typography";
import { StyleGuide } from "../utils/StyleGuide";

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 8,
    paddingBottom: 21,
    borderRadius: 18,
  },
  headerContainer: {
    marginBottom: 8,
  },
});

interface Props {
  title?: string;
  titleType?: TypographyTypes;
  from?: "left" | "right";
  backgroundColor?: string;
  content: string;
}

const Bubble = (props: Props) => {
  const {
    title,
    backgroundColor = StyleGuide.colorPalette.orange,
    titleType = TypographyTypes.NORMAL500,
    content,
  } = props;

  const containerStyle = useMemo<ViewStyle[]>(
    () => [styles.container, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={containerStyle}>
      {title && (
        <View style={styles.headerContainer}>
          <Typography textAlign="center" numberOfLines={2} type={titleType}>
            {title}
          </Typography>
        </View>
      )}
      <View>
        <Typography
          numberOfLines={2}
          textAlign="center"
          type={TypographyTypes.NORMAL24}
        >
          {content}
        </Typography>
      </View>
    </View>
  );
};

export default Bubble;
