import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { GOLD_STAR, GRAY_STAR, RED_STAR } from "assets/images";

const styles = StyleSheet.create({
  star: {
    width: 42,
    height: 42,
  },
});

interface Props {
  difficult: "easy" | "middle" | "hard";
  size?: number;
}

const Star = (props: Props) => {
  const { difficult, size } = props;

  const starImage = useMemo(() => {
    switch (difficult) {
      case "easy":
        return RED_STAR;
      case "middle":
        return GRAY_STAR;
      case "hard":
        return GOLD_STAR;
    }
  }, [difficult]);

  const starImageStyle = useMemo(
    () => [styles.star, size ? { width: size, height: size } : {}],
    [size]
  );

  return <Image source={starImage} style={starImageStyle} />;
};

export default Star;
