import { Typography } from "components";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { StyleGuide, TabBarType, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIcon: {
    aspectRatio: 1,
    width: 50,
    marginBottom: 8,
  },
});

interface Props extends TabBarType {
  onPress: (index: number) => void;
  selected: boolean;
}

const Tab = (props: Props) => {
  const { image, index, title, onPress, selected } = props;

  const handleOnPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  const imageStyle = useMemo(
    () => [
      styles.tabBarIcon,
      selected && { tintColor: StyleGuide.colorPalette.brown },
    ],
    [selected]
  );

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <Image source={image} style={imageStyle} />
      <Typography
        textAlign="center"
        color={StyleGuide.colorPalette.black}
        type={TypographyTypes.NORMAL12}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Tab;
