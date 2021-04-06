import { Alert } from "react-native";
import { store } from "../../redux/store";
import Api from "../api";
import { useMemo, useState, useCallback } from "react";
import { GlobalState, IUserInfo } from "../../utils";
import useUser from "../../redux/hooks/user";
import { UserActionsTypes } from "../../redux/types";

export default function UserController() {
  const [storeState] = useState<GlobalState>(store.getState());
  const { setUser } = useUser();

  const userAuth = useCallback(
    async (code: string) => {
      try {
        const response = await Api.getInstance().userAuth(
          code,
          storeState.user.id
        );
        setUser(UserActionsTypes.SET_TOKEN, { token: response.token });
        setUser(UserActionsTypes.SET_PHONE, { phone: response.user.phone });
        return response;
      } catch (e) {
        Alert.alert("Не удалось зайти.", "Введите код заново");
      }
    },
    [setUser, storeState.user.id]
  );

  const userLogin = useCallback(
    async (number: string) => {
      try {
        const response = await Api.getInstance().userLogin(number);
        setUser(UserActionsTypes.SET_ID, { id: response._id });
        return response;
      } catch (e) {
        Alert.alert("Не удалось зайти.", "Введите номер заново");
      }
    },
    [setUser]
  );

  const userPutInfo = useCallback(
    async (info: IUserInfo) => {
      try {
        const response = await Api.getInstance().userPutInfo(
          info,
          storeState.user.token
        );

        return response;
      } catch (e) {
        Alert.alert("Не удалось зайти.", "Попробуйте заново.");
      }
    },
    [storeState.user.token]
  );

  const controller = useMemo(() => ({ userLogin, userAuth, userPutInfo }), [
    userAuth,
    userLogin,
    userPutInfo,
  ]);

  return controller;
}
