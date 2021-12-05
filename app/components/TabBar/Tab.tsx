import { Typography } from "components";
import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { StyleGuide, TabBarType, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  tabBarIcon: {
    aspectRatio: 1,
    width: 58,
    marginBottom: 8,
    tintColor: "#DEDEDC",
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
      selected && { tintColor: StyleGuide.colorPalette.green },
    ],
    [selected]
  );

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <Image source={image} style={imageStyle} />
      <Typography
        textAlign="center"
        color={selected ? StyleGuide.colorPalette.green : "#AAAAAA"}
        type={TypographyTypes.NORMAL12}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default Tab;
