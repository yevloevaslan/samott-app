import Api from "lib/api";
import SplashScreen from "react-native-splash-screen";
import { AppActionsTypes } from "utils";
import Controller from "./Controller";

class MainController extends Controller {
  async init() {
    SplashScreen.hide();
    Api.configure();
    this.getAboutProject();
  }

  async getAboutProject() {
    try {
      const response = await Api.getInfoAboutProject(this.token);
      const { banner, ...about } = response;
      this.dispatch(AppActionsTypes.SET_PROFILE_BANNER, {
        bannerUrl: banner,
      });
      return about;
    } catch (e) {}
  }

  async getGrammarFile() {
    try {
      const response = await Api.getGrammar(this.token);
      return response;
    } catch (ignore) {}
    return undefined;
  }
}

export default new MainController();
