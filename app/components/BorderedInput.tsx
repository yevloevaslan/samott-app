import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInputProps,
  KeyboardTypeOptions,
} from "react-native";
import TextInputMask from "react-native-text-input-mask";
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
  onChangeText: (text?: string) => void;
}

const BorderedInput = (props: Props) => {
  const { onChangeText, type = "any", onError } = props;
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
    }
  }, [type]);

  const handleOnChangeText = useCallback(
    (text: string, ext?: string) => {
      if (regular.current && onError && ext) {
        onError(!ext.match(regular.current));
      }
      onChangeText(mask ? ext : text);
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
      <TextInputMask
        {...props}
        mask={mask}
        keyboardType={keyboardType}
        onChangeText={handleOnChangeText}
        style={[styles.input, StyleGuide.typography[TypographyTypes.NORMAL24]]}
      />
    </View>
  );
};

export default BorderedInput;
