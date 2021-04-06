import { ApiLogin, ApiUserInfo } from "./apiTypes";
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

  async userAuth(code: string, _id?: string) {
    const response = await RestApiHelper.build<ApiUserInfo>("userAuth")
      .withBody({
        _id,
        code,
      })
      .fetch();

    const data = response.body.data;

    return {
      token: data.token,
      phone: data.user.phone,
    };
  }

  async userLogin(phone: string) {
    const response = await RestApiHelper.build<ApiLogin>("userLogin")
      .withBody({
        phone,
      })
      .fetch();

    return response.body.data;
  }
}
