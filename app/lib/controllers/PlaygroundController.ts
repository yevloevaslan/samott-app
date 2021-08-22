import Api from "lib/api";
import { Alert } from "react-native";
import PlaygroundActions from "redux/actions/playgroundActions";
import { IAnswer, ITask, MissionDifficultType } from "utils";
import Controller from "./Controller";

class PlaygroundController extends Controller {
  async getTask(level: MissionDifficultType): Promise<ITask> {
    const currentTask = await Api.getTask(this.token, level);
    this.dispatch(PlaygroundActions.SET_CURRENT_TASK, {
      currentTask,
    });
    return currentTask;
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
