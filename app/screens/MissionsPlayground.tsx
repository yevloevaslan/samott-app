import { StackScreenProps } from "@react-navigation/stack";
import { SKIP } from "assets/images";
import {
  Bubble,
  DifficultSelector,
  Header,
  Typography,
  withBackgroundHoc,
} from "components";
import { SelectMission, TypeMission } from "components/missions";
import { useAsyncEffect } from "hooks";
import PlaygroundController from "lib/controllers/PlaygroundController";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePlayground, useUser } from "redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  IAnswer,
  ITask,
  RoutesNames,
  StyleGuide,
  TaskTypes,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  ratingBubbleContainer: {
    marginLeft: 10,
  },
  difficultContainer: {
    marginTop: 20,
    paddingRight: 40,
  },
  scoreTitleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 47,
    marginTop: 19,
    marginBottom: 20,
  },
  skipButtonImage: {
    width: 43,
    height: 39,
  },
  taskContainer: {
    paddingHorizontal: 40,
    flex: 1,
  },
  taskAnswersContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.MISSIONS_PLAYGROUND> {}

const REQUEST_TASK_TIME = 1000;

function MissionsPlayground(_props: Props) {
  const { user } = useUser();
  const { playground, addScore } = usePlayground();

  const [currentTask, setcurrentTask] = useState<ITask | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskAnswer, setTaskAnswer] = useState<IAnswer>();
  const [isRightAnswerGiven, setIsRightAnswerGiven] = useState<boolean>(false);
  const [isFreeInputLoading, setIsFreeInputLoading] = useState<boolean>(false);

  const loadTask = useCallback(async () => {
    setIsLoading(true);
    try {
      if (playground.currentDifficult) {
        const response = await PlaygroundController.getTask(
          playground.currentDifficult
        );
        if (response) {
          setcurrentTask(response);
          setTaskAnswer(undefined);
        }
      }
    } catch (e) {
      setcurrentTask(undefined);
      setTaskAnswer(undefined);
    }
    setIsRightAnswerGiven(false);
    setIsLoading(false);
    setCompleted(false);
  }, [playground.currentDifficult]);

  useAsyncEffect(async () => {
    loadTask();
  }, [playground.currentDifficult]);

  useEffect(() => {
    if (completed) {
      setTimeout(loadTask, REQUEST_TASK_TIME);
    }
  }, [completed]);

  const handleOnComplete = useCallback(
    async (answer: string) => {
      if (currentTask) {
        setIsFreeInputLoading(true);
        try {
          const response = await PlaygroundController.checkAnswer(
            currentTask._id,
            answer
          );
          if (response) {
            setTaskAnswer(response);
            if (response.trueResult) {
              setIsRightAnswerGiven(true);
              addScore(currentTask.points, playground.currentDifficult);
            }
          }
        } catch (e) {}
        setIsFreeInputLoading(false);
        setCompleted(true);
      }
    },
    [addScore, playground.currentDifficult, currentTask]
  );

  const renderMission = useCallback(() => {
    if (currentTask) {
      const defaultParams = {
        title: currentTask.title,
        answer: taskAnswer,
        onComplete: handleOnComplete,
      };
      switch (currentTask.type) {
        case TaskTypes.AUDIO:
          return (
            <SelectMission<TaskTypes.AUDIO>
              {...currentTask.params}
              {...defaultParams}
            />
          );
        case TaskTypes.CORRECT_TRANSLATE:
          return (
            <SelectMission<TaskTypes.CORRECT_TRANSLATE>
              {...currentTask.params}
              {...defaultParams}
              findWord={currentTask.params.text}
            />
          );
        case TaskTypes.IMAGES:
          return (
            <SelectMission<TaskTypes.IMAGES>
              {...currentTask.params}
              {...defaultParams}
              findWord={currentTask.params.text}
              withPhotos
            />
          );
        case TaskTypes.SPACE:
          return (
            <SelectMission<TaskTypes.SPACE>
              {...currentTask.params}
              {...defaultParams}
              subTitle={currentTask.params.text}
            />
          );
        case TaskTypes.AUDIO_FREE_ANSWER:
          return (
            <TypeMission
              isLoading={isFreeInputLoading}
              params={currentTask.params}
              {...defaultParams}
            />
          );
      }
    }

    return (
      <Typography color={StyleGuide.colorPalette.black}>
        На данный момент задач нет.
      </Typography>
    );
  }, [currentTask, handleOnComplete, isFreeInputLoading, taskAnswer]);

  const countsBackgroundColor = useMemo(
    () =>
      completed
        ? isRightAnswerGiven
          ? StyleGuide.colorPalette.green
          : StyleGuide.colorPalette.red
        : StyleGuide.colorPalette.mediumDarkGray,
    [completed, isRightAnswerGiven]
  );

  return (
    <View style={styles.container}>
      <Header avatar title={user.firstName} decorators="right">
        <View style={styles.ratingBubbleContainer}>
          <Bubble backgroundColor={StyleGuide.colorPalette.mayo}>
            <Typography
              type={TypographyTypes.NORMAL18}
              color={StyleGuide.colorPalette.black}
            >
              Рейтинг {playground.totalScore}
            </Typography>
          </Bubble>
        </View>
      </Header>
      <View style={styles.difficultContainer}>
        <DifficultSelector difficult={playground.currentDifficult} />
      </View>
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color={StyleGuide.colorPalette.black} />
        </View>
      ) : (
        <>
          {currentTask && (
            <View style={styles.scoreTitleContainer}>
              <Bubble
                backgroundColor={countsBackgroundColor}
                title={`баллы ${currentTask?.points}`}
              />
              <TouchableOpacity disabled={isLoading} onPress={loadTask}>
                <Image source={SKIP} style={styles.skipButtonImage} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.taskContainer}>
            <View style={styles.taskAnswersContainer}>{renderMission()}</View>
          </View>
        </>
      )}
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true
)(MissionsPlayground);