import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.colorPalette.orange,
    paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
  },
});

interface Props {
  onPress: () => void;
  children?: React.ReactNode;
}

const Button = (props: Props) => {
  const { onPress, children } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
