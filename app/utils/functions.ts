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
