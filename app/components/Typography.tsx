import React from "react";
import { Text, TextProps } from "react-native";
import { TypographyTypes, StyleGuide } from "../utils";

interface Props extends TextProps {
  children?: React.ReactFragment;
  type: TypographyTypes;
  color?: string;
  textAlign?: "center" | "left" | "right" | "auto" | "justify";
  numberOfLines?: number;
}

const Typography = (props: Props) => {
  const {
    type,
    color = StyleGuide.colorPalette.white,
    style,
    textAlign,
    numberOfLines = 1,
  } = props;

  return (
    <Text
      {...props}
      adjustsFontSizeToFit
      numberOfLines={numberOfLines}
      style={[style, StyleGuide.typography[type], { color, textAlign }]}
    />
  );
};

export default Typography;
