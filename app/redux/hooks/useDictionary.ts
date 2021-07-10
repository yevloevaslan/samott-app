import { useSelector } from "react-redux";
import { GlobalState } from "utils";

const useDictionary = () => {
  const dictionary = useSelector((state: GlobalState) => state.dictionary);
  return { ...dictionary };
};

export default useDictionary;
