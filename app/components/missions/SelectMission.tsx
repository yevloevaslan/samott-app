import { MissionAnswer, MissionTitle, Player } from "components";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GetSelectTaskParams, IMissionTaskProps, TaskTypes } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

type Props<
  T extends Exclude<TaskTypes, TaskTypes.AUDIO_FREE_ANSWER>
> = IMissionTaskProps &
  GetSelectTaskParams<T> & {
    withPhotos?: boolean;
    findWord?: string;
    subTitle?: string;
    answers?: string[];
    photos?: string[];
    sound?: string;
  };

const SelectMission = <
  T extends Exclude<TaskTypes, TaskTypes.AUDIO_FREE_ANSWER>
>(
  props: Props<T>
) => {
  const {
    onComplete,
    answer,
    title,
    withPhotos,
    answers,
    photos,
    sound,
    findWord,
    subTitle,
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  const handleOnAnswerPress = useCallback(
    (answ: string) => {
      let userAnswer = answ;
      if (photos) {
        const oldAnswer = photos.find((p) => p.includes(answ));
        if (oldAnswer) {
          userAnswer = String(photos.indexOf(oldAnswer) + 1);
        }
      }
      setSelectedAnswer(answ);
      onComplete(userAnswer);
    },
    [onComplete, photos]
  );

  const renderAnswer = useCallback(
    (item: string, index: number) => (
      <MissionAnswer
        photoAnswer={withPhotos}
        answer={item}
        selected={selectedAnswer === item}
        rightAnswer={answer}
        onPress={handleOnAnswerPress}
        key={index}
        index={index}
      />
    ),
    [answer, handleOnAnswerPress, selectedAnswer, withPhotos]
  );

  const data = useMemo(() => photos || answers, [answers, photos]);

  return (
    <>
      <MissionTitle title={title} findWord={findWord} subTitle={subTitle} />
      {sound && <Player sound={sound} />}
      {data && <View style={styles.container}>{data.map(renderAnswer)}</View>}
    </>
  );
};

export default SelectMission;