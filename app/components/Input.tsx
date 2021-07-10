import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 16,
    backgroundColor: StyleGuide.colorPalette.white,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowRadius: 2,
    shadowOpacity: 0.45,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 3,
  },
});

interface Props extends TextInputProps {}

export default function Input(props: Props) {
  return <TextInput style={styles.defaultStyle} {...props} />;
}
