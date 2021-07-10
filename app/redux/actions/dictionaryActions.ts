import { createAction } from "@reduxjs/toolkit";
import { DictionaryActions, IDictionary, StoreDictionary } from "utils";

export const setFoundWords = createAction<IDictionary[]>(
  DictionaryActions.SET_FOUND_WORDS
);

export const setSelectedLang = createAction<StoreDictionary["selectedLang"]>(
  DictionaryActions.SET_SELECTED_LANG
);

export const setSearchInput = createAction<string>(
  DictionaryActions.SET_SEARCH_INPUT
);
