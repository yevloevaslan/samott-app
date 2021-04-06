import { IUserInfo } from "./../../utils/interfaces";
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

    return data;
  }

  async userLogin(phone: string) {
    const response = await RestApiHelper.build<ApiLogin>("userLogin")
      .withBody({
        phone,
      })
      .fetch();

    return response.body.data;
  }

  async userPutInfo(info: IUserInfo, token: string) {
    const response = await RestApiHelper.build<void>("userPutInfo")
      .withBody({ ...info })
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body;
  }

  async userGetInfo(token: string) {
    const response = await RestApiHelper.build<{ data: IUserInfo }>(
      "userGetInfo"
    )
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body.data;
  }
}
