import { useCallback, useMemo, useState } from "react";

interface ActionsInterface<T> {
  setAt: (index: number, value: T) => void;
  concat: (array: T[]) => void;
  push: (value: T) => void;
  set: (array: T[]) => void;
  get: () => T[] | undefined;
  sort: (compareFn?: (a: T, b: T) => number) => T[] | undefined;
  getAt: (index: number) => T | -1;
}

const useArray = <T>(initialState?: T[]): ActionsInterface<T> => {
  const [userArray, setUserArray] = useState<T[] | undefined>(initialState);

  const sort = useCallback(
    (compareFn?: (a: T, b: T) => number) => {
      const sorted = userArray ? userArray.sort(compareFn) : undefined;
      setUserArray(sorted);
      return sorted;
    },
    [userArray]
  );

  const get = useCallback(() => userArray, [userArray]);

  const set = useCallback((array: T[]) => {
    setUserArray(array);
  }, []);

  const setAt = useCallback((index: number, value: T) => {
    setUserArray(
      (prev) => prev && prev.map((v, i) => (i === index ? value : v))
    );
  }, []);

  const concat = useCallback(
    (array: T[]) => {
      const newArray = userArray?.concat(array) || array;
      setUserArray(newArray);
    },
    [userArray]
  );

  const push = useCallback((value: T) => {
    setUserArray((prev) => prev?.concat(value) || [value]);
  }, []);

  const getAt = useCallback(
    (index: number) => {
      if (userArray && userArray[index]) {
        return userArray[index];
      }

      return -1;
    },
    [userArray]
  );

  const actions = useMemo<ActionsInterface<T>>(
    () => ({ concat, setAt, push, set, get, sort, getAt }),
    [concat, setAt, push, set, get, sort, getAt]
  );

  return actions;
};

export default useArray;
