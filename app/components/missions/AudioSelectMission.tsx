import { SEND } from "assets/images";
import { MissionTitle, Player } from "components";
import Typography from "components/Typography";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  GetSelectTaskParams,
  IMissionTaskProps,
  StyleGuide,
  TaskTypes,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  selectedButtonContainer: {
    backgroundColor: StyleGuide.colorPalette.gray,
  },
  submitBtnContainer: {
    backgroundColor: StyleGuide.colorPalette.gray,
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    marginBottom: 15,
  },
  submitBtnActiveContainer: {
    backgroundColor: StyleGuide.colorPalette.green,
  },
  submitImage: {
    width: 24,
    aspectRatio: 1,
    marginRight: 12,
  },
  finalWordContainer: {
    backgroundColor: StyleGuide.colorPalette.white,
    padding: 20,
    marginBottom: 10,
    flex: 1,
    borderRadius: 20,
  },
});

type ExtraAnswerType = GetSelectTaskParams<TaskTypes.AUDIO>["answers"][0];

interface TaskAnswerProps {
  answer: ExtraAnswerType;
  onPress: (answ: ExtraAnswerType) => void;
  selected: boolean;
  isLoading: boolean;
  isRight?: boolean;
}

const TaskAnswer = (props: TaskAnswerProps) => {
  const { selected, answer, onPress, isLoading, isRight } = props;

  const handleOnPress = useCallback(() => {
    onPress(answer);
  }, [answer, onPress]);

  const containerStyle = useMemo(() => {
    const res: ViewStyle[] = [styles.buttonContainer];
    if (selected) {
      res.push(styles.selectedButtonContainer);
      if (isRight !== undefined) {
        res.push({
          backgroundColor: isRight
            ? StyleGuide.colorPalette.green
            : StyleGuide.colorPalette.red,
        });
      }
    }
    return res;
  }, [isRight, selected]);

  return (
    <TouchableOpacity
      disabled={selected && isLoading}
      style={containerStyle}
      onPress={handleOnPress}
    >
      {selected && isLoading ? (
        <ActivityIndicator />
      ) : (
        <Typography textAlign="center" type={TypographyTypes.NORMAL14}>
          {answer}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

interface Props
  extends GetSelectTaskParams<TaskTypes.AUDIO>,
    Omit<IMissionTaskProps, "onComplete"> {
  onComplete: (answers: ExtraAnswerType[]) => void;
}

const AudioMission = (props: Props) => {
  const {
    title,
    sound,
    answers,
    answer: rightAnswer,
    onComplete,
    isLoading,
  } = props;
  const [selectedAnswers, setSelectedAnswers] = useState<ExtraAnswerType[]>([]);

  const handleOnAnswerPress = useCallback((answer: ExtraAnswerType) => {
    setSelectedAnswers((prev) => {
      if (prev.find((a) => a === answer)) {
        return prev.filter((a) => a !== answer);
      }

      return prev.concat([answer]);
    });
  }, []);

  const renderAnswer = useCallback(
    (answer: ExtraAnswerType, index: number) => {
      const selected = selectedAnswers.find((a) => a === answer);
      return (
        <TaskAnswer
          key={index}
          answer={answer}
          onPress={handleOnAnswerPress}
          selected={!!selected}
          isLoading={isLoading}
          isRight={
            rightAnswer ? rightAnswer.answer.includes(answer) : undefined
          }
        />
      );
    },
    [handleOnAnswerPress, isLoading, rightAnswer, selectedAnswers]
  );

  const submitBtnStyle = useMemo(
    () => [
      styles.submitBtnContainer,
      selectedAnswers.length ? styles.submitBtnActiveContainer : {},
    ],
    [selectedAnswers.length]
  );

  const handleOnSubmitPress = useCallback(() => {
    onComplete(selectedAnswers);
  }, [onComplete, selectedAnswers]);

  return (
    <>
      <MissionTitle title={title} />
      <Player sound={sound} />
      {selectedAnswers.length > 0 && (
        <View style={styles.finalWordContainer}>
          <Typography color={StyleGuide.colorPalette.black}>
            {selectedAnswers.join(" ")}
          </Typography>
        </View>
      )}
      <TouchableOpacity
        onPress={handleOnSubmitPress}
        disabled={!selectedAnswers.length}
        style={submitBtnStyle}
      >
        <Image source={SEND} style={styles.submitImage} />
        <Typography>Подтвердить</Typography>
      </TouchableOpacity>
      <View style={styles.container}>{answers.map(renderAnswer)}</View>
    </>
  );
};

export default AudioMission;
