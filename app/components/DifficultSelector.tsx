import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Typography } from ".";
import { GOLD_STAR, GRAY_STAR, RED_STAR } from "../assets/images";
import { StyleGuide, TypographyTypes } from "../utils";

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 18,
    paddingLeft: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 30,
  },
  easy: {
    backgroundColor: StyleGuide.colorPalette.mayo,
  },
  middle: {
    backgroundColor: StyleGuide.colorPalette.orange,
  },
  hard: {
    backgroundColor: StyleGuide.colorPalette.tomato,
  },
  star: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
});

const Star = ({ difficult }: { difficult: "easy" | "middle" | "hard" }) => {
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

  return <Image source={starImage} style={styles.star} />;
};

const Stars = ({ difficult }: { difficult: "easy" | "middle" | "hard" }) => {
  const count = useMemo(() => {
    switch (difficult) {
      case "easy":
        return 1;
      case "middle":
        return 2;
      case "hard":
        return 3;
    }
  }, [difficult]);

  const renderStar = useCallback(
    (value: "easy" | "middle" | "hard", index: number) => {
      return <Star key={index} difficult={difficult} />;
    },
    [difficult]
  );

  return (
    <View style={styles.starsContainer}>
      {new Array(count).fill(difficult).map(renderStar)}
    </View>
  );
};

interface Props {
  onPress?: () => void;
  difficult: "easy" | "middle" | "hard";
}

const DifficultSelector = (props: Props) => {
  const { onPress, difficult } = props;

  const containerStyle = useMemo(() => {
    let result: ViewStyle[] = [styles.container];

    switch (difficult) {
      case "easy":
        result = [...result, styles.easy];
        break;
      case "middle":
        result = [...result, styles.middle];
        break;
      case "hard":
        result = [...result, styles.hard];
        break;
    }

    return result;
  }, [difficult]);

  const title = useMemo(() => {
    switch (difficult) {
      case "easy":
        return "ЛЕГКИЙ";
      case "middle":
        return "СРЕДНИЙ";
      case "hard":
        return "СЛОЖНЫЙ";
    }
  }, [difficult]);

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={!onPress}
      onPress={onPress}
    >
      <Stars difficult={difficult} />
      <Typography textAlign="center" type={TypographyTypes.NORMAL18}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default DifficultSelector;
