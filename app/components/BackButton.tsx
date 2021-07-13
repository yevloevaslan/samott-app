import { ARROW_BUTTON } from "assets/images";
import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 21,
  },
});

interface Props {
  onPress?: () => void;
}

const BackButton = (props: Props) => {
  const { onPress } = props;
  const handleOnBackButtonPress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handleOnBackButtonPress}>
      <Image source={ARROW_BUTTON} style={styles.image} />
    </TouchableOpacity>
  );
};

export default BackButton;
