import { Alert } from "react-native";
import Api from "../api";
import { ApiLogin } from "../api/apiTypes";

class UserController {
  async userLogin(number: string): Promise<ApiLogin | void> {
    try {
      return await Api.getInstance().userLogin(number);
    } catch (e) {
      Alert.alert("Не удалось зайти.", "Введите номер заново");
    }
  }
}

export default new UserController();
