import { SEARCH_ICON } from "assets/images";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  defaultStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F2F0",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DADADA",
    ...StyleGuide.typography[TypographyTypes.NORMAL18],
    fontSize: 18,
    lineHeight: 21,
    paddingRight: 40,
  },
});

interface Props extends TextInputProps {}

export default function Input(props: Props) {
  return (
    <View>
      <TextInput
        placeholder="Введите слово"
        style={styles.defaultStyle}
        {...props}
      />
      <Image
        style={{
          width: 34,
          aspectRatio: 1,
          position: "absolute",
          right: 8,
          top: 11,
        }}
        source={SEARCH_ICON}
      />
    </View>
  );
}
