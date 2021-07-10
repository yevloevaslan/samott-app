import { StackScreenProps } from "@react-navigation/stack";
import { CHANGE_LANG } from "assets/images";
import {
  Button,
  DictionaryWordsList,
  Header,
  Input,
  Typography,
  withBackgroundHoc,
} from "components";
import DictionaryController from "lib/controllers/DictionaryController";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useDictionary } from "redux/hooks";
import {
  BackgroundImages,
  getDeclining,
  HomeStackProps,
  RoutesNames,
  StoreDictionary,
  StyleGuide,
  TypographyTypes,
} from "utils";

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 41,
    paddingTop: 26,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerBtn: {
    backgroundColor: StyleGuide.colorPalette.brown,
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  switchLangBtn: {
    justifyContent: "space-between",
  },
  changeImage: {
    aspectRatio: 28 / 16,
    width: 28,
    marginHorizontal: 2,
  },
  inputContainer: {
    marginBottom: 11,
  },
  wordListTitle: {
    marginBottom: 22,
  },
  fullWordsContainer: {
    marginTop: 22,
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const SEARCH_TIMEOUT = 300;

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.DICTIONARY> {}

const Dictionary = (props: Props) => {
  const {} = props;
  const { words, selectedLang, searchInput: initialSearch } = useDictionary();
  const searchTimer = useRef<any>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>(initialSearch);

  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    if (searchInput.length > 0) {
      setIsLoading(true);
      searchTimer.current = setTimeout(async () => {
        await DictionaryController.findWord(searchInput);
        DictionaryController.setSearchInput(searchInput);
        setIsLoading(false);
      }, SEARCH_TIMEOUT);
    }
  }, [searchInput, selectedLang]);

  const anotherLang = useMemo<StoreDictionary["selectedLang"]>(
    () => (selectedLang === "РУС" ? "ИНГ" : "РУС"),
    [selectedLang]
  );

  const handleOnChangeLang = useCallback(() => {
    DictionaryController.setLang(anotherLang);
  }, [anotherLang]);

  const fullWords = useMemo(
    () =>
      words.filter((w) =>
        selectedLang === "ИНГ" ? w.ing === searchInput : w.rus === searchInput
      ),
    [searchInput, selectedLang, words]
  );

  const wordsWhichContainsSearch = useMemo(
    () =>
      words.filter((w) =>
        selectedLang === "ИНГ"
          ? w.ing !== searchInput && w.ing.includes(searchInput)
          : w.rus !== searchInput && w.rus.includes(searchInput)
      ),
    [searchInput, selectedLang, words]
  );

  return (
    <View>
      <Header title="Словарь-Дошлорг" decorators="right" />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Button
              onPress={handleOnChangeLang}
              style={[styles.headerBtn, styles.switchLangBtn]}
            >
              <Typography type={TypographyTypes.NORMAL14}>
                {selectedLang}
              </Typography>
              <Image source={CHANGE_LANG} style={styles.changeImage} />
              <Typography type={TypographyTypes.NORMAL14}>
                {anotherLang}
              </Typography>
            </Button>
            <Button style={styles.switchLangBtn}>
              <Typography />
            </Button>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Введите слово"
              placeholderTextColor={StyleGuide.colorPalette.darkGrey}
              onChangeText={setSearchInput}
              value={searchInput}
            />
          </View>
          {isLoading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator color={StyleGuide.colorPalette.blue} />
            </View>
          ) : (
            <>
              {searchInput.length > 0 ? (
                <>
                  <Typography
                    type={TypographyTypes.NORMAL14}
                    color={StyleGuide.colorPalette.darkGrey}
                  >
                    Результат по слову{" "}
                    <Typography color={"#636363"}>{searchInput}</Typography> -{" "}
                    {fullWords.length > 0
                      ? `${fullWords.length} ${getDeclining(fullWords.length, [
                          "слово",
                          "слова",
                          "слов",
                        ])}`
                      : "Нет данных"}
                  </Typography>
                  <View style={styles.fullWordsContainer}>
                    <DictionaryWordsList words={fullWords} />
                  </View>
                  <Typography
                    type={TypographyTypes.NORMAL14}
                    color={StyleGuide.colorPalette.darkGrey}
                    style={styles.wordListTitle}
                  >
                    Слова с{" "}
                    <Typography color={"#636363"}>{searchInput}</Typography>
                    {wordsWhichContainsSearch.length > 0
                      ? undefined
                      : " - Нет данных"}
                  </Typography>
                  <DictionaryWordsList words={wordsWhichContainsSearch} />
                </>
              ) : null}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true
)(Dictionary);
