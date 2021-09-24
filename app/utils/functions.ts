import { DevSettings } from "react-native";

export function HelloWorld() {
  return "Hello, World!";
}

export function reducer<T>(state: T, action: { type: string; payload: any }) {
  return { ...state, ...action.payload };
}

export const RestartApp = DevSettings.reload;

export function getDeclining(value: number, declinings: string[]): string {
  const lastTwoNumbers = Number(String(value).substr(-2));
  if (lastTwoNumbers >= 10 && lastTwoNumbers <= 19) {
    return declinings[1];
  }

  const lastNumber = lastTwoNumbers % 10;

  if (lastNumber === 1) {
    return declinings[0];
  }

  if (lastNumber === 0 || (lastNumber >= 5 && lastNumber <= 9)) {
    return declinings[1];
  }

  return declinings[2];
}

export function deepEqual<T extends Object = object>(
  firstObj?: T,
  secondObj?: T
): boolean {
  if ((!firstObj && secondObj) || (firstObj && !secondObj)) {
    return false;
  }

  if (firstObj && secondObj) {
    const firstObjKeys = Object.keys(firstObj) as (keyof T)[];
    const secondObjKeys = Object.keys(secondObj) as (keyof T)[];

    if (firstObjKeys.length !== secondObjKeys.length) {
      return false;
    }

    for (const key of firstObjKeys) {
      const firstObjValue = firstObj[key];
      const secondObjValue = secondObj[key];

      if (typeof firstObjValue !== typeof secondObjValue) {
        return false;
      }

      if (Array.isArray(firstObjValue)) {
        return firstObjValue.every(() =>
          deepEqual(firstObjValue, secondObjValue)
        );
      } else if (typeof firstObjValue === "object") {
        return deepEqual(firstObjValue, secondObjValue);
      } else if (firstObjValue !== secondObjValue) {
        return false;
      }
    }
  }

  return true;
}
