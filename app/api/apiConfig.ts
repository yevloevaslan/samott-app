import { Config } from "rest-api-helper";

declare const global: any;
interface ApiConfig extends Config {}

const config: ApiConfig = {
  baseURL: "",
  logger: __DEV__ && Boolean(global.origin),
  headers: {
    "content-Type": "application/json",
  },
  statusDescription: {
    "200": "OK",
    "401": "Invalid API token",
  },
  successStatus: [200],
  request: {},
};

export default config;
