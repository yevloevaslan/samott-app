import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, IUser, IUserInfo, UserActionsTypes } from "utils";

const useUser = () => {
  const user = useSelector((state: GlobalState) => state.user);
  const userInfo: Omit<IUserInfo, "rating"> = useSelector(
    (state: GlobalState) => ({
      lastName: state.user.lastName,
      firstName: state.user.firstName,
      email: state.user.email,
      sex: state.user.sex,
      birthday: state.user.birthday,
      middleName: state.user.middleName,
      img: state.user.img,
    })
  );
  const dispatchUser = useDispatch();
  const setUser = useCallback(
    (type: UserActionsTypes, payload: Partial<IUser>) =>
      dispatchUser({ type, payload }),
    [dispatchUser]
  );
  return { user, setUser, userInfo };
};

export default useUser;
