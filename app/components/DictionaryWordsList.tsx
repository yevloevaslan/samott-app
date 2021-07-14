import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDictionary } from "redux/hooks";
import { IDictionary, StyleGuide, TypographyTypes } from "utils";
import Typography from "./Typography";

const styles = StyleSheet.create({
  wordItem: {
    marginBottom: 10,
    fontWeight: "500",
  },
});

interface Props {
  words: IDictionary[];
}

export default function DictionaryWordsList(props: Props) {
  const { words } = props;
  const { selectedLang } = useDictionary();

  const renderWord = useCallback(
    (item: IDictionary, index: number) => {
      if (selectedLang === "ИНГ") {
        return (
          <Typography
            type={TypographyTypes.NORMAL18}
            style={styles.wordItem}
            color={StyleGuide.colorPalette.brown}
            key={index}
          >
            {item.ing} - {item.rus}
          </Typography>
        );
      }

      return (
        <Typography
          type={TypographyTypes.NORMAL18}
          style={styles.wordItem}
          color={StyleGuide.colorPalette.brown}
          key={index}
        >
          {item.rus} - {item.ing}
        </Typography>
      );
    },
    [selectedLang]
  );

  return <View>{words.map(renderWord)}</View>;
}