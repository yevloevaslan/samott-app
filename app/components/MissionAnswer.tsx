import { Typography } from "components";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { IAnswer, StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  correctAnswer: {
    backgroundColor: StyleGuide.colorPalette.green,
  },
  wrongAnswer: {
    backgroundColor: StyleGuide.colorPalette.red,
  },
  buttonContainer: {
    width: "48%",
    borderRadius: 12,
    height: 85,
    backgroundColor: StyleGuide.colorPalette.mediumDarkGray,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  imageAnswer: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    borderWidth: 5,
    borderColor: StyleGuide.colorPalette.transparent,
  },
  correctPhotoAnswer: {
    borderColor: StyleGuide.colorPalette.green,
  },
  wrongPhotoAnswer: {
    borderColor: StyleGuide.colorPalette.red,
  },
});

interface Props {
  answer: string;
  onPress: (answer: string) => void;
  rightAnswer?: IAnswer;
  selected: boolean;
  photoAnswer?: boolean;
  index: number;
}

export default function MissionAnswer(props: Props) {
  const { onPress, rightAnswer, selected, answer, photoAnswer, index } = props;

  const handleOnPress = useCallback(() => {
    onPress(answer);
  }, [answer, onPress]);

  const getContainerColor = useCallback(
    <T extends ViewStyle | ImageStyle>(mainStyle: T, correct: T, wrong: T) => {
      const result: T[] = [mainStyle];
      if (selected && rightAnswer) {
        result.push(
          (
            photoAnswer
              ? rightAnswer.answer === String(index + 1)
              : rightAnswer.answer === answer
          )
            ? correct
            : wrong
        );
      } else if (
        rightAnswer && photoAnswer
          ? rightAnswer.answer === String(index + 1)
          : rightAnswer?.answer === answer
      ) {
        result.push(correct);
      }
      return result;
    },
    [answer, index, photoAnswer, rightAnswer, selected]
  );

  const containerStyle = useMemo(
    () =>
      getContainerColor<ViewStyle>(
        styles.buttonContainer,
        styles.correctAnswer,
        styles.wrongAnswer
      ),
    [getContainerColor]
  );

  const imageStyle = useMemo(
    () =>
      getContainerColor<ImageStyle>(
        styles.imageAnswer,
        styles.correctPhotoAnswer,
        styles.wrongPhotoAnswer
      ),
    [getContainerColor]
  );

  const renderAnswerContent = useCallback(() => {
    if (photoAnswer) {
      return <Image source={{ uri: answer }} style={imageStyle} />;
    }

    return (
      <Typography
        textAlign="center"
        type={TypographyTypes.NORMAL500}
        color={StyleGuide.colorPalette.white}
        numberOfLines={3}
      >
        {answer}
      </Typography>
    );
  }, [answer, imageStyle, photoAnswer]);

  return (
    <TouchableOpacity
      disabled={!!rightAnswer}
      onPress={handleOnPress}
      style={containerStyle}
    >
      {selected && !rightAnswer ? (
        <ActivityIndicator color={StyleGuide.colorPalette.white} />
      ) : (
        <>{renderAnswerContent()}</>
      )}
    </TouchableOpacity>
  );
}
