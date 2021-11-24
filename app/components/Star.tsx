import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { STAR } from "assets/images";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  star: {
    width: 32,
    aspectRatio: 1,
  },
});

interface Props {
  color: string;
  size?: number;
}

const Star = (props: Props) => {
  const { color = StyleGuide.colorPalette.tomato, size = 32 } = props;

  const starImageStyle = useMemo(
    () => [
      styles.star,
      { tintColor: color },
      size ? { width: size, height: size } : {},
    ],
    [color, size]
  );

  return <Image source={STAR} style={starImageStyle} />;
};

export default Star;
