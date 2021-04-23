import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions, GlobalState, IApp } from "utils";

const useApp = (): {
  app: IApp;
  setApp: (type: AppActions, user: Partial<IApp>) => void;
} => {
  const app = useSelector((state: GlobalState) => state.app);
  const dispatchApp = useDispatch();
  const setApp = useCallback(
    (type: AppActions, payload: Partial<IApp>) =>
      dispatchApp({ type, payload }),
    [dispatchApp]
  );
  return { app, setApp };
};

export default useApp;
