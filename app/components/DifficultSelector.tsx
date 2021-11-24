import { Star, Typography } from "components";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MissionDifficultType, StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficultCounter: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 24,
    width: 86,
  },
  starContainer: {
    marginRight: 10,
  },
});

interface Props {
  difficult?: MissionDifficultType;
  onPress?: (difficult: MissionDifficultType) => void;
  score?: number;
}

export default function DifficultSelector(props: Props) {
  const { difficult, onPress, score } = props;

  const handleOnPress = useCallback(() => {
    if (onPress && difficult) {
      onPress(difficult);
    }
  }, [difficult, onPress]);

  const backgroundColor = useMemo(() => {
    switch (difficult) {
      case MissionDifficultType.EASY:
        return StyleGuide.colorPalette.mayo;
      case MissionDifficultType.MEDIUM:
        return StyleGuide.colorPalette.orange;
      case MissionDifficultType.HARD:
        return StyleGuide.colorPalette.tomato;
    }
  }, [difficult]);

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: StyleGuide.colorPalette.lightGray,
        paddingRight: score !== undefined ? 24 : 10,
        paddingVertical: score !== undefined ? 12 : 20,
        paddingLeft: score !== undefined ? 8 : 18,
      },
    ],
    [score]
  );

  const starsToRender = useMemo(() => {
    let resultLength = 0;

    switch (difficult) {
      case MissionDifficultType.EASY:
        resultLength = 1;
        break;
      case MissionDifficultType.MEDIUM:
        resultLength = 2;
        break;
      case MissionDifficultType.HARD:
        resultLength = 3;
    }

    return new Array(resultLength).fill(difficult);
  }, [difficult]);

  const renderStar = useCallback(
    (item: MissionDifficultType, index: number) => {
      let color = StyleGuide.colorPalette.green;

      switch (item) {
        case MissionDifficultType.HARD:
          color = StyleGuide.colorPalette.tomato;
          break;
        case MissionDifficultType.MEDIUM:
          color = StyleGuide.colorPalette.yellow;
      }
      return (
        <View key={index} style={styles.starContainer}>
          <Star color={color} size={score !== undefined ? 24 : undefined} />
        </View>
      );
    },
    [score]
  );

  const title = useMemo(() => {
    switch (difficult) {
      case MissionDifficultType.EASY:
        return "ЛЕГКИЙ";
      case MissionDifficultType.MEDIUM:
        return "СРЕДНИЙ";
      case MissionDifficultType.HARD:
        return "СЛОЖНЫЙ";
    }
  }, [difficult]);

  const counterContntainerStyle = useMemo(
    () => [styles.difficultCounter, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={styles.containerWrapper}>
      <TouchableOpacity
        disabled={!onPress}
        onPress={handleOnPress}
        style={containerStyle}
      >
        <Typography
          color={StyleGuide.colorPalette.gray}
          type={
            score !== undefined
              ? TypographyTypes.NORMAL18
              : TypographyTypes.BOLD18
          }
        >
          {title}
        </Typography>
        <View style={styles.starsContainer}>
          {starsToRender.map(renderStar)}
        </View>
      </TouchableOpacity>
      {score !== undefined && (
        <View style={counterContntainerStyle}>
          <Typography type={TypographyTypes.NORMAL18}>{score}</Typography>
        </View>
      )}
    </View>
  );
}
