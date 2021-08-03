import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActionsTypes, GlobalState, IApp } from "utils";

const useApp = (): {
  app: IApp;
  setApp: (type: AppActionsTypes, user: Partial<IApp>) => void;
  setIsPlaying: (isPlaying: boolean) => void;
} => {
  const app = useSelector((state: GlobalState) => state.app);
  const dispatchApp = useDispatch();
  const setApp = useCallback(
    (type: AppActionsTypes, payload: Partial<IApp>) =>
      dispatchApp({ type, payload }),
    [dispatchApp]
  );
  const setIsPlaying = useCallback(
    (isPlaying: boolean) => {
      dispatchApp({
        type: AppActionsTypes.SET_IS_PLAYING,
        payload: { isPlaying },
      });
    },
    [dispatchApp]
  );

  return { app, setApp, setIsPlaying };
};

export default useApp;
