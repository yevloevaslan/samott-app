import { RestApiHelper } from "rest-api-helper";
import config from "./apiConfig";

class ApiService {
  constructor() {
    RestApiHelper.builder().withConfig(config);
  }
}

export default new ApiService();
