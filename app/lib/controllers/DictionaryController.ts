import Api from "lib/api";
import { DictionaryActions, StoreDictionary } from "utils";
import Controller from "./Controller";

class DictionaryController extends Controller {
  private get lang(): StoreDictionary["selectedLang"] {
    return this.state.dictionary.selectedLang;
  }
  async findWord(word: string) {
    if (word !== "") {
      try {
        const response = await Api.findWord(this.token, word, this.lang);
        this.dispatch(DictionaryActions.SET_FOUND_WORDS, response);
      } catch (e) {
        this.parseError(e);
      }
    }
  }

  setLang(lang: StoreDictionary["selectedLang"]) {
    this.dispatch(DictionaryActions.SET_SELECTED_LANG, lang);
  }

  setSearchInput(searchInput: string) {
    this.dispatch(DictionaryActions.SET_SEARCH_INPUT, searchInput);
  }
}

export default new DictionaryController();
