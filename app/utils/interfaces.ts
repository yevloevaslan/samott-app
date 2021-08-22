import { ImageSourcePropType, TextStyle } from "react-native";
import { Colors, TypographyTypes, BackgroundImages, TaskTypes } from "utils";
import { ITask, MissionDifficultType } from "./types";

export interface IApp {
  isPlaying: boolean;
  bannerUrl?: string;
}

export interface GlobalState {
  user: IUser;
  app: IApp;
  playground: IPlaygound;
  dictionary: StoreDictionary;
}

export interface IStyleGuide {
  colorPalette: { [color in Colors]: string };
  typography: { [typography in TypographyTypes]: TextStyle };
  backgrounds: { [background in BackgroundImages]: ImageSourcePropType };
}

export interface IUserInfo {
  lastName: string;
  middleName: string;
  firstName: string;
  email?: string;
  phone?: string;
  score?: number;
  birthday?: Date;
  sex?: "m" | "f";
}

export interface IPlaygound {
  totalScore: number;
  easyLevelScore: number;
  mediumLevelScore: number;
  hardLevelScore: number;
  currentTask?: ITask;
  currentDifficult?: MissionDifficultType;
}

export interface IUser extends IUserInfo {
  id?: string;
  phone?: string;
  token: string;
  photo?: { uri?: string };
}

export interface IMissionTaskProps {
  onComplete: (answer: string) => void;
  answer?: IAnswer;
  title: string;
  isLoading: boolean;
}

export interface CommonTaskData {
  _id: string;
  title: string;
  description: string;
  level: string;
  points: number;
  active: boolean;
}

export interface TaskImage {
  type: TaskTypes.IMAGES;
  params: {
    photos: string[];
    text: string;
  };
}

export interface TaskCorrectTranslate {
  type: TaskTypes.CORRECT_TRANSLATE;
  params: {
    text: string;
    answers: string[];
  };
}

export interface TaskAudio {
  type: TaskTypes.AUDIO;
  params: {
    sound: string;
    answers: string[];
  };
}

export interface TaskFreeAnswer {
  type: TaskTypes.AUDIO_FREE_ANSWER;
  params: {
    sound: string;
  };
}

export interface TaskSpace {
  type: TaskTypes.SPACE;
  params: {
    answers: string[];
    text: string;
  };
}

export interface IAnswer {
  trueResult: boolean;
  answer: string | string[];
}

export interface IDictionary {
  rus: string;
  ing: string;
}

export interface StoreDictionary {
  words: IDictionary[];
  selectedLang: "РУС" | "ИНГ";
  searchInput: string;
}

export interface IAboutProject {
  project: IProject;
  author: IProject;
  banner: string;
}

export interface IProject {
  description: string;
  photos: string[];
}
