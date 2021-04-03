import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  buttonWrapper: {
    width: 26,
    height: 26,
    padding: 2,
    borderColor: StyleGuide.colorPalette.red,
    borderWidth: 3,
    marginRight: 10,
  },
  settedContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: StyleGuide.colorPalette.red,
  },
});

interface Props {
  onPress: (isSetted?: boolean) => void;
  children?: React.ReactNode;
}

const RadioButton = (props: Props) => {
  const { onPress, children } = props;
  const [isSetted, setIsSetted] = useState<boolean>(false);

  const handleOnPress = useCallback(() => {
    setIsSetted((prev) => !prev);
    onPress(isSetted);
  }, [isSetted, onPress]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={styles.buttonWrapper}>
        {isSetted && <View style={styles.settedContainer} />}
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default RadioButton;
