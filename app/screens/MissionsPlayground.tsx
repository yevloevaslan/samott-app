import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { SKIP } from "assets/images";
import {
  Bubble,
  Header,
  Star,
  Typography,
  withBackgroundHoc,
} from "components";
import {
  AudioSelectMission,
  SelectMission,
  TypeMission,
} from "components/missions";
import PlaygroundController from "lib/controllers/PlaygroundController";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SoundPlayer from "react-native-sound-player";
import { usePlayground, useUser } from "redux/hooks";
import {
  BackgroundImages,
  getDeclining,
  HomeStackProps,
  IAnswer,
  ITask,
  MissionDifficultType,
  RoutesNames,
  StyleGuide,
  TaskTypes,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  ratingBubbleContainer: {
    marginLeft: 10,
  },
  difficultContainer: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: StyleGuide.colorPalette.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
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
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    marginHorizontal: 3,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.MISSIONS_PLAYGROUND> {}

const REQUEST_TASK_TIME = 1000;

function MissionsPlayground(_props: Props) {
  const { user } = useUser();
  const { playground } = usePlayground();

  const [currentTask, setCurrentTask] = useState<ITask | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskAnswer, setTaskAnswer] = useState<IAnswer>();
  const [isTaskAnswerLoading, setIsTaskAnswerLoading] = useState<boolean>(
    false
  );

  const loadTask = useCallback(async () => {
    setIsLoading(true);
    try {
      if (playground.currentDifficult) {
        const response = await PlaygroundController.getTask(
          playground.currentDifficult
        );
        if (response) {
          setCurrentTask(response);
          setTaskAnswer(undefined);
        }
      }
    } catch (e) {
      setCurrentTask(undefined);
      setTaskAnswer(undefined);
    }
    setCompleted(false);
    setIsLoading(false);
  }, [playground.currentDifficult]);

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, [loadTask])
  );

  useEffect(() => {
    if (completed) {
      setTimeout(loadTask, REQUEST_TASK_TIME);
    }
  }, [completed]);

  const handleOnComplete = useCallback(
    async (answer?: string | string[]) => {
      if (!answer) {
        setCompleted(true);
      }
      if (currentTask) {
        if (answer) {
          setIsTaskAnswerLoading(true);
          const response = await PlaygroundController.checkAnswer(
            currentTask._id,
            answer
          );
          if (response) {
            setTaskAnswer(response);
            if (response.trueResult) {
              SoundPlayer.playSoundFile("rightanswer", "mp3");
            } else {
              SoundPlayer.playSoundFile("wronganswer", "mp3");
            }
          }
          setIsTaskAnswerLoading(false);
          setCompleted(true);
        }
      }
    },
    [currentTask]
  );

  const currentDifficultLevel = useMemo(() => {
    switch (playground.currentDifficult) {
      case MissionDifficultType.EASY:
        return "легкий";
      case MissionDifficultType.MEDIUM:
        return "средний";
      default:
        return "сложный";
    }
  }, [playground.currentDifficult]);

  const renderMission = useCallback(() => {
    if (currentTask) {
      const defaultParams = {
        title: currentTask.params.text,
        answer: taskAnswer,
        onComplete: handleOnComplete,
        isLoading: isTaskAnswerLoading,
        onError: loadTask,
      };
      switch (currentTask.type) {
        case TaskTypes.AUDIO:
          return (
            <AudioSelectMission {...currentTask.params} {...defaultParams} />
          );
        case TaskTypes.CORRECT_TRANSLATE:
          return (
            <SelectMission<TaskTypes.CORRECT_TRANSLATE>
              {...defaultParams}
              {...currentTask.params}
            />
          );
        case TaskTypes.IMAGES:
          return (
            <SelectMission<TaskTypes.IMAGES>
              {...currentTask.params}
              {...defaultParams}
              withPhotos
            />
          );
        case TaskTypes.SPACE:
          return (
            <SelectMission<TaskTypes.SPACE>
              {...currentTask.params}
              {...defaultParams}
            />
          );
        case TaskTypes.AUDIO_FREE_ANSWER:
          return <TypeMission params={currentTask.params} {...defaultParams} />;
      }
    }

    return (
      <Typography numberOfLines={1} color={StyleGuide.colorPalette.black}>
        На данный момент задач нет.
      </Typography>
    );
  }, [currentTask, handleOnComplete, isTaskAnswerLoading, taskAnswer]);

  const renderStars = useCallback(() => {
    let count = 1;
    let color = "#8ECF6F";
    switch (playground.currentDifficult) {
      case MissionDifficultType.MEDIUM:
        count = 2;
        color = StyleGuide.colorPalette.yellow;
        break;
      case MissionDifficultType.HARD:
        count = 3;
        color = StyleGuide.colorPalette.tomato;
    }
    const res = [];
    for (let index = 0; index < count; index++) {
      res.push(
        <View key={index} style={styles.starContainer}>
          <Star key={index} color={color} size={26} />
        </View>
      );
    }
    return <View style={styles.starsContainer}>{res}</View>;
  }, [playground.currentDifficult]);

  return (
    <View style={styles.container}>
      <Header avatar title={user.firstName} decorators="right">
        <View style={styles.ratingBubbleContainer}>
          <Bubble backgroundColor={StyleGuide.colorPalette.white}>
            <View style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
              <Typography
                type={TypographyTypes.NORMAL18}
                color={StyleGuide.colorPalette.black}
              >
                Рейтинг {user.rating}
              </Typography>
            </View>
          </Bubble>
        </View>
      </Header>
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color={StyleGuide.colorPalette.black} />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 70 }}
            style={styles.taskContainer}
          >
            {currentTask && (
              <View style={styles.difficultContainer}>
                <View>
                  <Typography
                    color={StyleGuide.colorPalette.gray}
                    type={TypographyTypes.BOLD18}
                  >
                    Уровень {currentDifficultLevel}
                  </Typography>
                  <Typography
                    type={TypographyTypes.NORMAL12}
                    color={StyleGuide.colorPalette.darkGrey}
                  >
                    Вы получите {currentTask.points}{" "}
                    {getDeclining(currentTask?.points, [
                      "балл",
                      "баллов",
                      "балла",
                    ])}
                  </Typography>
                </View>
                {renderStars()}
              </View>
            )}
            <View style={styles.taskAnswersContainer}>{renderMission()}</View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              width: "100%",
              bottom: 20,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: StyleGuide.colorPalette.lightGray,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 32,
                alignItems: "center",
              }}
            >
              <Typography
                color={StyleGuide.colorPalette.black}
                type={TypographyTypes.NORMAL14}
              >
                Выполнено{" "}
                {playground.counts.userTasksCount[
                  playground.currentDifficult
                ] || 0}{" "}
                /{" "}
                {playground.counts.totalTasksCount[playground.currentDifficult]}
              </Typography>
            </View>
            <TouchableOpacity disabled={isLoading} onPress={loadTask}>
              <Image source={SKIP} style={styles.skipButtonImage} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true,
  false
)(MissionsPlayground);
