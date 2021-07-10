import { SEND } from "assets/images";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: StyleGuide.colorPalette.white,
    borderWidth: 1,
    borderColor: StyleGuide.colorPalette.gray45,
    borderRadius: 7,
    flex: 1,
    marginRight: 10,
  },
  buttonImage: {
    height: 30,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}

export default function TaskInput(props: Props) {
  const { onSubmit, isLoading } = props;
  const [value, setValue] = useState<string>("");

  const handleOnSubmitPress = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Введите нужное слово."
        style={styles.input}
        onChangeText={setValue}
      />
      <TouchableOpacity disabled={isLoading} onPress={handleOnSubmitPress}>
        {isLoading ? (
          <View style={styles.buttonImage}>
            <ActivityIndicator color={StyleGuide.colorPalette.gray45} />
          </View>
        ) : (
          <Image source={SEND} style={styles.buttonImage} />
        )}
      </TouchableOpacity>
    </View>
  );
}
