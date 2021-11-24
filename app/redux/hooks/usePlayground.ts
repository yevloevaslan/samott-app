import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaygroundActions from "redux/actions/playgroundActions";
import { GlobalState, MissionDifficultType } from "utils";

const usePlayground = () => {
  const playground = useSelector((state: GlobalState) => state.playground);
  const dispatch = useDispatch();

  const setScore = useCallback(
    (score: number) =>
      dispatch({
        type: PlaygroundActions.SET_SCORE,
        payload: { totalScore: score },
      }),
    [dispatch]
  );

  const setCurrentDifficult = useCallback(
    (difficult: MissionDifficultType) =>
      dispatch({
        type: PlaygroundActions.SET_CURRENT_DIFFICULT,
        payload: { currentDifficult: difficult },
      }),
    [dispatch]
  );

  return { playground, setScore, setCurrentDifficult };
};

export default usePlayground;
