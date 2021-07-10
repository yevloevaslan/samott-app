import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaygroundActions from "redux/actions/playgroundActions";
import { GlobalState, IPlaygound, MissionDifficultType } from "utils";

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

  const addScore = useCallback(
    (score: number, level?: MissionDifficultType) => {
      let type = PlaygroundActions.ADD_SCORE;
      let payload: Partial<IPlaygound> = {};
      if (level) {
        switch (level) {
          case MissionDifficultType.EASY:
            type = PlaygroundActions.SET_EASY_LEVEL_SCORE;
            payload = { easyLevelScore: score + playground.easyLevelScore };
            break;
          case MissionDifficultType.MEDIUM:
            type = PlaygroundActions.SET_MEDIUM_LEVEL_SCORE;
            payload = { mediumLevelScore: score + playground.mediumLevelScore };
            break;
          default:
            type = PlaygroundActions.SET_HARD_LEVEL_SCORE;
            payload = { hardLevelScore: score + playground.hardLevelScore };
        }
      }
      dispatch({ type, payload });
      if (type !== PlaygroundActions.ADD_SCORE) {
        dispatch({
          type: PlaygroundActions.ADD_SCORE,
          payload: { totalScore: playground.totalScore + score },
        });
      }
    },
    [
      dispatch,
      playground.easyLevelScore,
      playground.hardLevelScore,
      playground.mediumLevelScore,
      playground.totalScore,
    ]
  );

  const setCurrentDifficult = useCallback(
    (difficult: MissionDifficultType) =>
      dispatch({
        type: PlaygroundActions.SET_CURRENT_DIFFICULT,
        payload: { currentDifficult: difficult },
      }),
    [dispatch]
  );

  return { playground, setScore, setCurrentDifficult, addScore };
};

export default usePlayground;
