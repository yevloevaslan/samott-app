import { Alert } from "react-native";
import { store } from "../../redux/store";
import Api from "../api";
import { useMemo, useState, useCallback } from "react";
import { GlobalState } from "../../utils";
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
        setUser(UserActionsTypes.SET_PHONE, { phone: response.phone });
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

  const controller = useMemo(() => ({ userLogin, userAuth }), [
    userAuth,
    userLogin,
  ]);

  return controller;
}
