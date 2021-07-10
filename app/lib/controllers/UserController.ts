import { Alert } from "react-native";
import Api from "../api";
import { IUserInfo, UserActionsTypes } from "utils";
import Controller from "./Controller";
import PlaygroundActions from "redux/actions/playgroundActions";

class UserController extends Controller {
  async userAuth(code: string) {
    try {
      const response = await Api.userAuth(code, this.store.getState().user.id);
      this.dispatch(UserActionsTypes.SET_TOKEN, { token: response.token });
      this.dispatch(UserActionsTypes.SET_PHONE, {
        phone: response.user.phone,
      });
      return response;
    } catch (e) {
      Alert.alert("Не удалось зайти.", `${e}`);
    }
  }

  async userLogin(number: string) {
    try {
      const response = await Api.userLogin(number);
      this.dispatch(UserActionsTypes.SET_ID, { id: response._id });
      return response;
    } catch (e) {
      Alert.alert("Не удалось зайти.", `${e}`);
    }
  }

  async userPutInfo(info: Partial<IUserInfo>) {
    try {
      return await Api.userPutInfo(info, this.store.getState().user.token);
    } catch (e) {
      Alert.alert("Не удалось зайти.", `${e}`);
    }
  }

  async userGetInfo() {
    try {
      const response = await Api.userGetInfo(this.store.getState().user.token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, score, ...rest } = response;
      this.dispatch(UserActionsTypes.SET_INFO, {
        ...rest,
        birthday: new Date(response.birthday),
      });
      this.dispatch(PlaygroundActions.SET_SCORE, { totalScore: score });
      return response;
    } catch (e) {
      Alert.alert("Ошибка", `${e}`);
    }
  }
}

export default new UserController();
