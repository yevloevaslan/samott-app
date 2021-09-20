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
      return await Api.getInfoAboutProject(this.token);
    } catch (e) {}
  }

  async getBanner() {
    try {
      const { banner } = await Api.getInfoAboutProject(this.token);
      this.dispatch(AppActionsTypes.SET_PROFILE_BANNER, {
        bannerUrl: banner,
      });
    } catch (e) {}
  }

  async getGrammarFile() {
    try {
      return await Api.getGrammar(this.token);
    } catch (ignore) {}
    return undefined;
  }
}

export default new MainController();
