import { TASK_TITLE_ORNAMENT } from "assets/images";
import { Typography } from "components";
import React, { useCallback, useState } from "react";
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
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitleContainerImage: {
    position: "absolute",
    left: -40,
    top: 0,
    aspectRatio: 1.57,
    width: 141,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
  },
});

interface Props {
  title: string;
}

export default function MissionTitle(props: Props) {
  const { title } = props;
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const handleOnLayout = useCallback<Required<View["props"]>["onLayout"]>(
    (e) => {
      setContainerHeight(e.nativeEvent.layout.height);
    },
    []
  );

  return (
    <View onLayout={handleOnLayout} style={styles.taskTitleContainer}>
      <Image
        resizeMode="contain"
        style={[
          styles.taskTitleContainerImage,
          { top: containerHeight / 2 - 45.96 },
        ]}
        source={TASK_TITLE_ORNAMENT}
      />
      <View style={styles.titleContainer}>
        <Typography
          textAlign="center"
          numberOfLines={100}
          type={TypographyTypes.NORMAL24}
          color={StyleGuide.colorPalette.black}
          style={styles.title}
        >
          {title}{" "}
        </Typography>
      </View>
    </View>
  );
}
