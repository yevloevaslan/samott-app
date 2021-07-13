import React from "react";
import { Text, TextProps } from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

interface Props extends TextProps {
  children?: React.ReactFragment;
  type?: TypographyTypes;
  color?: string;
  textAlign?: "center" | "left" | "right" | "auto" | "justify";
  numberOfLines?: number;
}

const Typography = (props: Props) => {
  const {
    type = TypographyTypes.NORMAL24,
    color = StyleGuide.colorPalette.white,
    style,
    textAlign,
    numberOfLines = 1,
  } = props;

  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      adjustsFontSizeToFit
      style={[style, StyleGuide.typography[type], { color, textAlign }]}
    />
  );
};

export default Typography;
