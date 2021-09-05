import { TASK_TITLE_ORNAMENT } from "assets/images";
import { Typography } from "components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  taskTitleContainer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: StyleGuide.colorPalette.lightGray,
    minHeight: 91,
    marginBottom: 20,
    width: "100%",
  },
  taskTitleContainerImage: {
    position: "absolute",
    left: -35,
    top: 0,
    aspectRatio: 1.57,
    width: 141,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  findWordText: {
    fontWeight: "500",
  },
});

interface Props {
  title: string;
  findWord?: string;
}

export default function MissionTitle(props: Props) {
  const { title, findWord } = props;
  return (
    <View style={styles.taskTitleContainer}>
      <Image
        resizeMode="contain"
        style={styles.taskTitleContainerImage}
        source={TASK_TITLE_ORNAMENT}
      />
      <View style={styles.titleContainer}>
        <Typography
          textAlign="center"
          numberOfLines={100}
          type={TypographyTypes.NORMAL18}
          color={StyleGuide.colorPalette.black}
        >
          {title}{" "}
          {findWord && (
            <Typography
              textAlign="center"
              style={styles.findWordText}
              type={TypographyTypes.NORMAL18}
              color={StyleGuide.colorPalette.black}
            >
              "{findWord}"
            </Typography>
          )}
        </Typography>
      </View>
    </View>
  );
}
