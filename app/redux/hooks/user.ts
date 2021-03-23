import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils";
import { IUser, UserActionsTypes } from "../types/userTypes";

const useUser = (): [IUser, (user: IUser) => void] => {
  const user = useSelector((state: GlobalState) => state.user);
  const dispatchUser = useDispatch();
  const setUser = useCallback(
    (us: Partial<IUser>) =>
      dispatchUser({ type: UserActionsTypes.SET_ID, payload: us.id }),
    [dispatchUser]
  );
  return [user, setUser];
};

export default useUser;
