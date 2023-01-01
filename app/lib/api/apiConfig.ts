import { Config } from "rest-api-helper";

declare const global: any;
interface ApiConfig extends Config {}

const config: ApiConfig = {
  baseURL: "https://samott.ru/api/",
  logger: __DEV__ && Boolean(global.origin),
  headers: {
    "content-Type": "application/json",
  },
  statusDescription: {
    "200": "OK",
    "401": "Invalid API token",
  },
  successStatus: [200],
  request: {
    userLogin: {
      url: "users/login",
      method: "POST",
    },
    userAuth: {
      url: "users/confirm",
      method: "POST",
    },
    userPutInfo: {
      url: "users/info",
      method: "PUT",
    },
    userGetInfo: {
      url: "users/info",
      method: "GET",
    },
    getTask: {
      url: "tasks/random",
      method: "GET",
    },
    checkAnswer: {
      method: "POST",
      url: "tasks/{taskId}/answer",
    },
    getWord: {
      method: "GET",
      url: "dictionaries",
    },
    getAboutProjects: {
      method: "GET",
      url: "about_projects",
    },
    getGrammar: {
      method: "GET",
      url: "about_projects/grammar",
    },
    deleteAccount: {
      method: "DELETE",
      url: "users/deleting",
    },
  },
};

export default config;
