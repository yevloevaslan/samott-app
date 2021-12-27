import { RoutesNames, TaskTypes } from "./enums";
import {
  CommonTaskData,
  IApp,
  IPlaygound,
  IProject,
  IUser,
  TaskAudio,
  TaskCorrectTranslate,
  TaskFreeAnswer,
  TaskImage,
  TaskSpace,
} from "./interfaces";

export enum MissionDifficultType {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

export type MainRoutesProps = {
  [route in RoutesNames]?: any;
};

export type HomeStackProps = {
  [RoutesNames.HOME]?: {};
  [RoutesNames.MISSIONS]?: object;
  [RoutesNames.CODE_ENTER]?: {
    email?: string;
    newTimer?: boolean;
  };
  [RoutesNames.PHONE_ENTER]?: object;
  [RoutesNames.ERROR_CODE]: {
    timerDuration: number;
    phoneNumber: string;
  };
  [RoutesNames.PIN_PHOTO]?: object;
  [RoutesNames.SPLASH]?: object;
  [RoutesNames.TAB_NAVIGATOR]?: object;
  [RoutesNames.PROFILE]?: object;
  [RoutesNames.PROFILE_SETTINGS]: {
    firstIn: boolean;
  };
  [RoutesNames.MISSIONS_PLAYGROUND]?: {};
  [RoutesNames.DICTIONARY]?: {};
  [RoutesNames.SHARE]?: {};
  [RoutesNames.PROJECT_INFO]: { info: IProject; title: string };
  [RoutesNames.PRIVACY_TEXT]?: {};
};

export type BorderedInputTypes =
  | "phone-number"
  | "auth-code"
  | "numbers-only"
  | "email"
  | "any";

export type TabBarType = {
  image: { uri: string };
  index: number;
  title: string;
  routeName: RoutesNames;
};

export type Difficult = "easy" | "medium" | "hard";

export type CommonReducerTypes = IApp | IPlaygound | IUser;

export type ITask = CommonTaskData &
  (TaskImage | TaskCorrectTranslate | TaskAudio | TaskFreeAnswer | TaskSpace);

export type GetTaskParams<T extends TaskTypes> = Extract<
  ITask,
  { type: T }
>["params"];

export type ISelectTask = Exclude<ITask, TaskFreeAnswer>;

export type GetSelectTaskParams<
  T extends Exclude<TaskTypes, TaskTypes.AUDIO_FREE_ANSWER>
> = Extract<ISelectTask, { type: T }>["params"];
