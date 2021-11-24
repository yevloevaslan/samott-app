import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 16,
    backgroundColor: "#F2F2F0",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DADADA",
    ...StyleGuide.typography[TypographyTypes.NORMAL18],
  },
});

interface Props extends TextInputProps {}

export default function Input(props: Props) {
  return (
    <TextInput
      placeholder="Введите слово"
      style={styles.defaultStyle}
      {...props}
    />
  );
}
