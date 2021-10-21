import { RestApiHelper } from "rest-api-helper";
import {
  IAboutProject,
  IAnswer,
  IDictionary,
  IGrammarFile,
  ITask,
  IUserInfo,
  MissionDifficultType,
  StoreDictionary,
} from "../../utils";
import config from "./apiConfig";
import { ApiLogin, ApiUserAuth, ApiUserInfo } from "./apiTypes";

const RUN_IN_V8 = Boolean((global as any).origin);

export default class Api {
  static configure() {
    config.logger = __DEV__ && RUN_IN_V8;
    RestApiHelper.builder().withConfig(config);
  }
  private static instance: Api;

  static async userAuth(code: string, _id?: string) {
    const response = await RestApiHelper.build<ApiUserAuth>("userAuth")
      .withBody({
        _id,
        code,
      })
      .fetch();

    return response.body.data;
  }

  static async userLogin(phone: string) {
    const response = await RestApiHelper.build<ApiLogin>("userLogin")
      .withBody({
        phone,
      })
      .fetch();

    return response.body.data;
  }

  static async userPutInfo(info: Partial<IUserInfo>, token: string) {
    const response = await RestApiHelper.build<IUserInfo>("userPutInfo")
      .withBody({
        ...info,
        birthday: info.birthday?.toISOString(),
        sex: info.sex || "",
        email: info.email ? info.email : undefined,
      })
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body;
  }

  static async userGetInfo(token: string) {
    const response = await RestApiHelper.build<{ data: ApiUserInfo }>(
      "userGetInfo"
    )
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body.data;
  }

  static async getTask(token: string, level?: MissionDifficultType) {
    const response = await RestApiHelper.build<{ data: { task: ITask } }>(
      "getTask"
    )
      .withHeaders({ "x-access-token": token })
      .withQueryParams({ level })
      .fetch();

    return response.body.data.task;
  }

  static async checkAnswer(
    token: string,
    taskId: string,
    answer: string | string[]
  ): Promise<IAnswer> {
    const response = await RestApiHelper.build<{ data: IAnswer }>("checkAnswer")
      .withHeaders({ "x-access-token": token })
      .withUrlParam("taskId", taskId)
      .withBody({ answer })
      .fetch();

    return response.body.data;
  }

  static async findWord(
    token: string,
    word: string,
    lang: StoreDictionary["selectedLang"]
  ): Promise<IDictionary[]> {
    const qwery = lang === "ИНГ" ? { ing: word } : { rus: word };
    const response = await RestApiHelper.build<{ data: IDictionary[] }>(
      "getWord"
    )
      .withHeaders({ "x-access-token": token })
      .withQueryParams(qwery)
      .fetch();

    return response.body.data;
  }

  static async getInfoAboutProject(token: string) {
    const response = await RestApiHelper.build<{ data: IAboutProject }>(
      "getAboutProjects"
    )
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body.data;
  }

  static async getGrammar(token: string) {
    const response = await RestApiHelper.build<{ data: IGrammarFile }>(
      "getGrammar"
    )
      .withHeaders({ "x-access-token": token })
      .fetch();

    return response.body.data;
  }

  static async uploadPhoto(
    token: string,
    data: FormData
  ): Promise<{
    data: {
      path: string;
    };
  }> {
    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("x-access-token", token);

    // eslint-disable-next-line no-undef
    const options: RequestInit = {
      method: "POST",
      headers,
      body: data,
    };

    const response = await fetch(
      "http://68.183.7.178:1855/api/admin/upload",
      options
    );

    return await response.json();
  }
}
