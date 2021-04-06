import { Config } from "rest-api-helper";

declare const global: any;
interface ApiConfig extends Config {}

const config: ApiConfig = {
  baseURL: "http://164.90.247.206/api/",
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
  },
};

export default config;
