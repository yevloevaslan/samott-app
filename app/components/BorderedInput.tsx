import React, { useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
} from "react-native";
import { StyleGuide, TypographyTypes } from "../utils";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: StyleGuide.colorPalette.red,
  },
  input: {
    padding: 0,
  },
});

interface Props extends TextInputProps {
  type?: "phone-number" | "any";
  onError?: (errored: boolean) => void;
}

const BorderedInput = (props: Props) => {
  const { onChangeText, type = "any", onError } = props;

  const mask = useMemo<RegExp | undefined>(() => {
    if (type === "any") {
      return;
    }

    switch (type) {
      case "phone-number":
        return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    }
  }, [type]);

  const handleOnChangeText = useCallback(
    (text: string) => {
      if (onChangeText) {
        if (mask && onError) {
          onError(!text.match(mask));
        }
        onChangeText(text);
      }
    },
    [mask, onChangeText, onError]
  );

  const keyboardType = useMemo<KeyboardTypeOptions | undefined>(() => {
    switch (type) {
      case "phone-number":
        return "phone-pad";
    }
  }, [type]);

  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        {...props}
        keyboardType={keyboardType}
        onChangeText={handleOnChangeText}
        style={[styles.input, StyleGuide.typography[TypographyTypes.NORMAL24]]}
      />
    </View>
  );
};

export default BorderedInput;
