import { Button, Typography } from "components";
import React, { useCallback } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: StyleGuide.colorPalette.gray45,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 19,
    paddingRight: 9,
  },
  contentContainer: {
    width: "100%",
    backgroundColor: StyleGuide.colorPalette.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  alertButton: {
    paddingVertical: 10,
    flexGrow: 1,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: StyleGuide.colorPalette.red,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 53,
  },
});

type ButtonType = {
  onPress: () => void;
  text: string;
};

interface Props {
  title: string;
  warning?: string;
  buttons: ButtonType[];
  visible: boolean;
}

const Alert = (props: Props) => {
  const { title, warning, buttons, visible } = props;

  const renderButton = useCallback((item: ButtonType, index: number) => {
    return (
      <Button style={styles.alertButton} key={index} onPress={item.onPress}>
        <Typography>{item.text}</Typography>
      </Button>
    );
  }, []);

  return (
    <Modal visible={visible} animated transparent animationType="fade">
      <TouchableOpacity activeOpacity={1} style={styles.overlay}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Typography color={StyleGuide.colorPalette.gray45}>
              {title}
            </Typography>
            {warning && (
              <Typography
                textAlign="center"
                numberOfLines={2}
                type={TypographyTypes.NORMAL18}
                color={StyleGuide.colorPalette.red}
              >
                {warning}
              </Typography>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            {buttons.map(renderButton)}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Alert;
