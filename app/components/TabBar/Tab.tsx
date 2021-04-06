import React, { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Typography } from "..";
import { StyleGuide, TabBarType, TypographyTypes } from "../../utils";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIcon: {
    width: 45,
    height: 50,
    marginBottom: 8,
  },
});

interface Props extends TabBarType {
  onPress: (index: number) => void;
}

const Tab = (props: Props) => {
  const { image, index, title, onPress, size } = props;

  const handleOnPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  const imageStyle = useMemo(
    () => [styles.tabBarIcon, { width: size.w, height: size.h }],
    [size.h, size.w]
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
