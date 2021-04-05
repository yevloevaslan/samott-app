import { DevSettings } from "react-native";

export function HelloWorld() {
  return "Hello, World!";
}

export function reducer<T>(state: T, action: { type: string; payload: any }) {
  return { ...state, ...action.payload };
}

export const RestartApp = DevSettings.reload;
