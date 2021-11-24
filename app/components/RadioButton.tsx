import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  buttonWrapper: {
    width: 26,
    height: 26,
    padding: 2,
    borderColor: StyleGuide.colorPalette.green,
    borderWidth: 3,
    marginRight: 10,
  },
  settedContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: StyleGuide.colorPalette.green,
  },
});

interface Props {
  onPress: (isSetted?: boolean) => void;
  children?: React.ReactNode;
  value?: boolean;
}

const RadioButton = (props: Props) => {
  const { onPress, children, value } = props;
  const [isSetted, setIsSetted] = useState<boolean>(value || false);

  const handleOnPress = useCallback(() => {
    if (value === undefined) {
      setIsSetted((prev) => !prev);
    }
    onPress(!isSetted);
  }, [isSetted, onPress, value]);

  const parsedSetted = useMemo(() => {
    if (value !== undefined) {
      return value;
    }

    return isSetted;
  }, [isSetted, value]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={styles.buttonWrapper}>
        {parsedSetted && <View style={styles.settedContainer} />}
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default RadioButton;
