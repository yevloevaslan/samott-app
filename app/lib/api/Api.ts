import { IUserInfo } from "../../utils";
import { ApiLogin, ApiUserAuth, ApiUserInfo } from "./apiTypes";
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
    const response = await RestApiHelper.build<ApiUserAuth>("userAuth")
      .withBody({
        _id,
        code,
      })
      .fetch();

    return response.body.data;
  }

  async userLogin(phone: string) {
    const response = await RestApiHelper.build<ApiLogin>("userLogin")
      .withBody({
        phone,
      })
      .fetch();

    return response.body.data;
  }

  async userPutInfo(info: Partial<IUserInfo>, token: string) {
    const response = await RestApiHelper.build<IUserInfo>("userPutInfo")
      .withBody({ ...info, birthday: info.birthday?.toISOString() })
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body;
  }

  async userGetInfo(token: string) {
    const response = await RestApiHelper.build<{ data: ApiUserInfo }>(
      "userGetInfo"
    )
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body.data;
  }
}
