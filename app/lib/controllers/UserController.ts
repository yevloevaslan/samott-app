import { Alert } from "react-native";
import PlaygroundActions from "redux/actions/playgroundActions";
import { IUserInfo, UserActionsTypes } from "utils";
import Api from "../api";
import Controller from "./Controller";

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
      const { createdAt, updatedAt, score, _id: id, ...rest } = response;
      this.dispatch(UserActionsTypes.SET_INFO, {
        ...rest,
        id,
        birthday: new Date(response.birthday),
      });
      this.dispatch(PlaygroundActions.SET_SCORE, { totalScore: score });
      return response;
    } catch (e) {
      Alert.alert("Ошибка", `${e}`);
    }
  }

  async uploadUserPhoto(
    imageUrl: string,
    name: string,
    type: string
  ): Promise<string | undefined> {
    try {
      const data = new FormData();
      data.append("file", {
        uri: imageUrl,
        name,
        type,
      });
      const {
        data: { path },
      } = await Api.uploadPhoto(this.token, data);
      return path;
    } catch (e) {}
    return undefined;
  }
}

export default new UserController();
