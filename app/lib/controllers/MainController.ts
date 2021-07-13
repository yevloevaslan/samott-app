import Api from "lib/api";
import SplashScreen from "react-native-splash-screen";
import Controller from "./Controller";

class MainController extends Controller {
  async init() {
    SplashScreen.hide();
    Api.configure();
  }

  async getAboutProject() {
    try {
      const response = Api.getInfoAboutProject(this.token);
      return response;
    } catch (e) {}
  }
}

export default new MainController();
