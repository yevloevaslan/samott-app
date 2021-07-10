import { store } from "redux/store";
import { GlobalState } from "utils";

export default class Controller {
  protected dispatch(type: string, payload: any) {
    this.store.dispatch({ type, payload });
  }

  protected get store() {
    return store;
  }

  protected get state(): GlobalState {
    return this.store.getState();
  }

  protected get token(): string {
    return this.state.user.token;
  }

  protected parseError(error: any): string | undefined {
    if (error.status === 500) {
      return error.body.error;
    }

    return undefined;
  }
}
