import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, IUser, UserActionsTypes } from "utils";

const useUser = (): {
  user: IUser;
  setUser: (type: UserActionsTypes, user: Partial<IUser>) => void;
} => {
  const user = useSelector((state: GlobalState) => state.user);
  const dispatchUser = useDispatch();
  const setUser = useCallback(
    (type: UserActionsTypes, payload: Partial<IUser>) =>
      dispatchUser({ type, payload }),
    [dispatchUser]
  );
  return { user, setUser };
};

export default useUser;
