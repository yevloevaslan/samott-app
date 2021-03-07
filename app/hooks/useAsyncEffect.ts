import { DependencyList, useCallback, useEffect } from "react";

const useAsyncEffect = (effect: () => Promise<void>, deps: DependencyList) => {
  const asyncEffect = useCallback(async () => {
    await effect();
  }, [effect]);

  return useEffect(() => {
    asyncEffect();
  }, deps);
};

export default useAsyncEffect;
