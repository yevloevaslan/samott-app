import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInputProps,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import TextInputMask from "react-native-text-input-mask";
import { StyleGuide, TypographyTypes, BorderedInputTypes } from "utils";

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
  type?: BorderedInputTypes;
  onError?: (errored: boolean) => void;
  onChangeText?: (text?: string, ext?: string) => void;
  style?: ViewStyle;
}

const BorderedInput = (props: Props) => {
  const { onChangeText, type = "any", onError, maxLength = 100 } = props;
  const regular = useRef<RegExp>();

  const mask = useMemo<string | undefined>(() => {
    if (type === "any") {
      return;
    }

    switch (type) {
      case "phone-number": {
        regular.current = /^\d{10}$/;
        return "+7 ([000]) [000] [00] [00]";
      }
      case "auth-code": {
        regular.current = /^\d{6}$/;
        return "[0] [0] [0] [0] [0] [0]";
      }
      case "numbers-only": {
        regular.current = /^\d*$/;
        return `[${new Array(maxLength).fill(0).join("")}]`;
      }
      case "email": {
        regular.current = /^\d*$/;
      }
    }
  }, [maxLength, type]);

  const handleOnChangeText = useCallback(
    (text: string, ext?: string) => {
      if (regular.current && onError && ext) {
        onError(!ext.match(regular.current));
      }
      if (onChangeText) {
        onChangeText(text, ext);
      }
    },
    [onChangeText, onError]
  );

  const keyboardType = useMemo<KeyboardTypeOptions | undefined>(() => {
    switch (type) {
      case "phone-number":
        return "phone-pad";
      case "auth-code":
        return "number-pad";
      case "numbers-only":
        return "number-pad";
    }
  }, [type]);

  return (
    <View style={[styles.container, props.style]}>
      <TextInputMask
        {...props}
        mask={mask}
        textContentType={type === "email" ? "emailAddress" : undefined}
        maxLength={100}
        placeholderTextColor={StyleGuide.colorPalette.gray}
        keyboardType={keyboardType}
        onChangeText={handleOnChangeText}
        style={[styles.input, StyleGuide.typography[TypographyTypes.NORMAL24]]}
      />
    </View>
  );
};

export default BorderedInput;
