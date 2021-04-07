import { Alert } from "react-native";
import { store } from "../../redux/store";
import Api from "../api";
import { useCallback, useMemo, useState } from "react";
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
        Alert.alert("Не удалось зайти.", `${e}`);
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
        Alert.alert("Не удалось зайти.", `${e}`);
      }
    },
    [setUser]
  );

  const userPutInfo = useCallback(
    async (info: Partial<IUserInfo>) => {
      try {
        return await Api.getInstance().userPutInfo(info, storeState.user.token);
      } catch (e) {
        Alert.alert("Не удалось зайти.", `${e}`);
      }
    },
    [storeState.user.token]
  );

  const userGetInfo = useCallback(async () => {
    try {
      const response = await Api.getInstance().userGetInfo(
        storeState.user.token
      );
      setUser(UserActionsTypes.SET_INFO, {
        ...response,
        birthday: new Date(response.birthday),
      });
      return response;
    } catch (e) {
      Alert.alert("Ошибка", `${e}`);
    }
  }, [setUser, storeState.user.token]);

  return useMemo(
    () => ({
      userLogin,
      userAuth,
      userPutInfo,
      userGetInfo,
    }),
    [userAuth, userLogin, userPutInfo, userGetInfo]
  );
}
