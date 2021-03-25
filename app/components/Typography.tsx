import React from "react";
import { Text, TextProps } from "react-native";
import { TypographyTypes, StyleGuide } from "../utils";

interface Props extends TextProps {
  children?: React.ReactFragment;
  type: TypographyTypes;
  color?: string;
}

const Typography = (props: Props) => {
  const { type, color = StyleGuide.colorPalette.white, style } = props;

  return (
    <Text {...props} style={[StyleGuide.typography[type], { color }, style]} />
  );
};

export default Typography;
