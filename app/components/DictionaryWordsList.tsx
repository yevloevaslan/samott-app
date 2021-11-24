import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDictionary } from "redux/hooks";
import { IDictionary, StyleGuide, TypographyTypes } from "utils";
import Typography from "./Typography";

const styles = StyleSheet.create({
  wordItem: {
    fontWeight: "500",
    width: "100%",
    fontStyle: "italic",
  },
  wordContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  wordDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: StyleGuide.colorPalette.green,
    marginRight: 10,
  },
});

interface Props {
  words: IDictionary[];
}

export default function DictionaryWordsList(props: Props) {
  const { words } = props;
  const { selectedLang } = useDictionary();

  const parseWord = useCallback((word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }, []);

  const renderWord = useCallback(
    (item: IDictionary, index: number) => {
      return (
        <View key={index} style={styles.wordContainer}>
          <View style={styles.wordDot} />
          <Typography
            type={TypographyTypes.NORMAL18}
            style={styles.wordItem}
            color="#4F4F4F"
            key={index}
          >
            {selectedLang === "ИНГ"
              ? `${parseWord(item.ing)} - ${parseWord(item.rus)}`
              : `${parseWord(item.rus)} - ${parseWord(item.ing)}`}
          </Typography>
        </View>
      );
    },
    [parseWord, selectedLang]
  );

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {words.map(renderWord)}
    </View>
  );
}
