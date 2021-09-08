import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StyleGuide } from "utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Typography } from "components";

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  datePickerButton: {
    borderBottomWidth: 2,
    borderBottomColor: StyleGuide.colorPalette.red,
    paddingBottom: 5,
    width: 60,
    alignItems: "center",
  },
});

interface Props {
  value?: Date;
  display?: "default" | "compact" | "inline" | "spinner" | "clock" | "calendar";
  onChange: (date: Date) => void;
  onPress?: () => void;
  mode?: "date" | "time";
  children?: React.ReactFragment;
  isPicker: boolean;
  onCancel?: () => void;
  onOpen: () => void;
}

const DatePicker = (props: Props) => {
  const {
    isPicker,
    onChange,
    children,
    value,
    onPress,
    onCancel,
    onOpen,
  } = props;

  const handleOnChange = useCallback(onChange, [onChange]);

  const handleOnDatePickerOpen = useCallback(() => {
    if (onPress) {
      onPress();
    }
    onOpen();
  }, [onOpen, onPress]);

  const renderInput = useCallback(
    (item: string, index: number) => {
      let time: number | undefined;
      switch (item) {
        case "ДД":
          time = value?.getDate();
          break;
        case "ММ":
          time = value ? value?.getMonth() + 1 : undefined;
          break;
        case "ГГГГ":
          time = value?.getFullYear();
          break;
      }
      return (
        <TouchableOpacity
          key={index}
          onPress={handleOnDatePickerOpen}
          style={styles.datePickerButton}
        >
          <Typography
            color={
              time
                ? StyleGuide.colorPalette.black
                : StyleGuide.colorPalette.gray
            }
          >
            {time || item}
          </Typography>
        </TouchableOpacity>
      );
    },
    [handleOnDatePickerOpen, value]
  );

  const handleOnCancel = useCallback(
    (_date: Date) => {
      if (onCancel) {
        onCancel();
      }
    },
    [onCancel]
  );

  return (
    <View style={styles.inputsContainer}>
      {children ? children : ["ДД", "ММ", "ГГГГ"].map(renderInput)}
      <DateTimePickerModal
        isVisible={isPicker}
        mode={props.mode}
        onConfirm={handleOnChange}
        onCancel={handleOnCancel}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default DatePicker;
