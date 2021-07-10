import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { GOLD_STAR, GRAY_STAR, RED_STAR } from "assets/images";
import { MissionDifficultType } from "utils";

const styles = StyleSheet.create({
  star: {
    width: 42,
    height: 42,
  },
});

interface Props {
  difficult: MissionDifficultType;
  size?: number;
}

const Star = (props: Props) => {
  const { difficult, size } = props;

  const starImage = useMemo(() => {
    switch (difficult) {
      case MissionDifficultType.EASY:
        return RED_STAR;
      case MissionDifficultType.MEDIUM:
        return GRAY_STAR;
      case MissionDifficultType.HARD:
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
