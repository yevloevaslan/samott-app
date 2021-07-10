import { createReducer } from "@reduxjs/toolkit";
import {
  setFoundWords,
  setSearchInput,
  setSelectedLang,
} from "redux/actions/dictionaryActions";
import { GlobalState } from "utils";

export const dictionaryInitialState: GlobalState["dictionary"] = {
  words: [],
  selectedLang: "РУС",
  searchInput: "",
};

export const dictionaryReducer = createReducer(
  dictionaryInitialState,
  (builder) => {
    builder.addCase(setFoundWords, (state, { payload }) => ({
      ...state,
      words: payload,
    }));
    builder.addCase(setSelectedLang, (state, { payload }) => ({
      ...state,
      selectedLang: payload,
    }));
    builder.addCase(setSearchInput, (state, { payload }) => ({
      ...state,
      searchInput: payload,
    }));
  }
);
