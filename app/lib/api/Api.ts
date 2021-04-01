import { ApiLogin } from "./apiTypes";
import { RestApiHelper } from "rest-api-helper";
import config from "./apiConfig";

const RUN_IN_V8 = Boolean((global as any).origin);

export default class Api {
  private static instance: Api;

  static getInstance(): Api {
    if (Api.instance) {
      return Api.instance;
    }

    config.logger = __DEV__ && RUN_IN_V8;
    RestApiHelper.builder().withConfig(config);

    Api.instance = new Api();
    return Api.instance;
  }

  async userLogin(phone: string) {
    const response = await RestApiHelper.build<{ data: ApiLogin }>("userLogin")
      .withBody({
        phone,
      })
      .fetch();

    return response.body.data;
  }
}
