import { StackScreenProps } from "@react-navigation/stack";
import { BOOK, CHANGE_LANG, TASK_TITLE_ORNAMENT } from "assets/images";
import {
  DictionaryWordsList,
  Header,
  Input,
  Typography,
  withBackgroundHoc,
} from "components";
import DictionaryController from "lib/controllers/DictionaryController";
import MainController from "lib/controllers/MainController";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
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
  containerWrapper: {
    paddingTop: 28,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  grammarBtn: {
    paddingVertical: 8,
    alignItems: "center",
  },
  headerBtn: {
    backgroundColor: StyleGuide.colorPalette.gray3,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    marginRight: 20,
    overflow: "hidden",
  },
  switchLangBtn: {
    justifyContent: "space-between",
  },
  changeImage: {
    aspectRatio: 28 / 16,
    width: 28,
    marginHorizontal: 7,
  },
  inputContainer: {
    marginBottom: 11,
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
  grammarBookImage: {
    tintColor: StyleGuide.colorPalette.white,
    aspectRatio: 18 / 23,
    width: 18,
    marginRight: 7,
  },
  headerBtnImage: {
    width: 61,
    aspectRatio: 61 / 38,
    position: "absolute",
    left: -16,
    zIndex: 1,
    opacity: 0.4,
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
  const [isGrammarLoading, setIsGrammarLoading] = useState<boolean>(false);

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
    } else {
      setIsLoading(false);
    }
  }, [searchInput, selectedLang]);

  const anotherLang = useMemo<StoreDictionary["selectedLang"]>(
    () => (selectedLang === "РУС" ? "ИНГ" : "РУС"),
    [selectedLang]
  );

  const handleOnChangeLang = useCallback(() => {
    DictionaryController.setLang(anotherLang);
  }, [anotherLang]);

  const handleOnGetGrammarPress = useCallback(async () => {
    setIsGrammarLoading(true);
    const response = await MainController.getGrammarFile();
    if (response && response.filename.length > 0) {
      Linking.openURL(response.filename);
    }
    setIsGrammarLoading(false);
  }, []);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color={StyleGuide.colorPalette.blue} />
        </View>
      );
    }

    if (words.length < 0) {
      return null;
    }

    return (
      <>
        <Typography
          type={TypographyTypes.NORMAL14}
          color={StyleGuide.colorPalette.darkGrey}
        >
          Найдено {words.length}{" "}
          {getDeclining(words.length, ["слово", "слов", "слова"])}
        </Typography>
        <View style={styles.fullWordsContainer}>
          <DictionaryWordsList words={words} />
        </View>
      </>
    );
  }, [isLoading, words]);

  return (
    <View style={styles.containerWrapper}>
      <Header title="Словарь-Дошлорг" decorators="right" />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={handleOnChangeLang}>
              <View style={[styles.headerBtn, styles.switchLangBtn]}>
                <Image
                  resizeMode="contain"
                  style={styles.headerBtnImage}
                  source={TASK_TITLE_ORNAMENT}
                />
                <Typography type={TypographyTypes.NORMAL14}>
                  {selectedLang}
                </Typography>
                <Image source={CHANGE_LANG} style={styles.changeImage} />
                <Typography type={TypographyTypes.NORMAL14}>
                  {anotherLang}
                </Typography>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              disabled={isGrammarLoading}
              onPress={handleOnGetGrammarPress}
            >
              <View style={[styles.headerBtn, styles.grammarBtn]}>
                <Image
                  resizeMode="contain"
                  style={styles.headerBtnImage}
                  source={TASK_TITLE_ORNAMENT}
                />
                {isGrammarLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Image source={BOOK} style={styles.grammarBookImage} />
                )}
                <Typography type={TypographyTypes.NORMAL14}>
                  Грамматика
                </Typography>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Введите слово"
              placeholderTextColor={StyleGuide.colorPalette.darkGrey}
              onChangeText={setSearchInput}
              value={searchInput}
            />
          </View>
          {renderContent()}
        </View>
      </View>
    </View>
  );
};

export default withBackgroundHoc(
  BackgroundImages.WITH_CASTLES,
  true
)(Dictionary);
