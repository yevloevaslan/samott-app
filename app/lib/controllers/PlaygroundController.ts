import Api from "lib/api";
import { Alert } from "react-native";
import PlaygroundActions from "redux/actions/playgroundActions";
import { playgroundInitialState } from "redux/reducers/playground";
import { IAnswer, ITask, MissionDifficultType } from "utils";
import Controller from "./Controller";

class PlaygroundController extends Controller {
  async getTask(level: MissionDifficultType): Promise<ITask> {
    const { task, tasksCount } = await Api.getTask(this.token, level);
    this.dispatch(PlaygroundActions.SET_CURRENT_TASK, { task });
    this.dispatch(PlaygroundActions.SET_TASKS_COUNTS, {
      counts: {
        totalTasksCount: tasksCount.totalTasksCount.byLevel,
        userTasksCount:
          tasksCount.userTasksCount.byLevel ||
          playgroundInitialState.counts.userTasksCount,
      },
    });
    return task;
  }

  async checkAnswer(
    taskId: string,
    answer: string | string[]
  ): Promise<IAnswer | undefined> {
    try {
      return await Api.checkAnswer(this.token, taskId, answer);
    } catch (e) {
      Alert.alert("Ошибка", `${e}`);
    }

    return undefined;
  }
}

export default new PlaygroundController();
