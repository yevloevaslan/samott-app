import { useCallback, useMemo, useState } from "react";

interface ActionsInterface<T> {
  setAt: (index: number, value: T) => void;
  concat: (array: T[]) => void;
  push: (value: T) => void;
  set: (array: T[]) => void;
  get: () => T[] | undefined;
  sort: (compareFn?: (a: T, b: T) => number) => T[] | undefined;
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

  const setAt = useCallback(
    (index: number, value: T) => {
      if (userArray && index < userArray.length - 1 && index > 0) {
        setUserArray(
          (prev) => prev && prev.map((v, i) => (i === index ? value : v))
        );
      }
    },
    [userArray]
  );

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

  const actions = useMemo<ActionsInterface<T>>(
    () => ({ concat, setAt, push, set, get, sort }),
    [concat, setAt, push, set, get, sort]
  );

  return actions;
};

export default useArray;
