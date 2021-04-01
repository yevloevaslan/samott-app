import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils";
import { IUser, UserActionsTypes } from "../types/userTypes";

const useUser = (): {
  user: IUser;
  setUser: (type: UserActionsTypes, user: IUser) => void;
} => {
  const user = useSelector((state: GlobalState) => state.user);
  const dispatchUser = useDispatch();
  const setUser = useCallback(
    (type: UserActionsTypes, us: Partial<IUser>) =>
      dispatchUser({ type, payload: { ...us } }),
    [dispatchUser]
  );
  return { user, setUser };
};

export default useUser;
