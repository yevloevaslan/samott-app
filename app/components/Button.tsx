import React, { useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.colorPalette.orange,
    paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  disabled: {
    backgroundColor: StyleGuide.colorPalette.gray,
  },
});

interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Button = (props: Props) => {
  const { onPress, children, disabled } = props;

  const containerStyle = useMemo<ViewStyle[]>(() => {
    if (disabled) {
      return [styles.container, styles.disabled];
    }
    return [styles.container];
  }, [disabled]);

  return (
    <TouchableOpacity {...props} onPress={onPress} style={containerStyle}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
