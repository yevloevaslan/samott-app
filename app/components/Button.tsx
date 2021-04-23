import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.colorPalette.orange,
    paddingVertical: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  disabled: {
    backgroundColor: StyleGuide.colorPalette.gray,
  },
  activityIndicator: {
    paddingVertical: 4,
  },
});

interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

const Button = (props: Props) => {
  const { onPress, children, disabled, isLoading } = props;

  const containerStyle = useMemo(() => {
    if (disabled) {
      return [styles.container, styles.disabled, props.style];
    }
    return [styles.container, props.style];
  }, [disabled, props.style]);

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={containerStyle}
    >
      {isLoading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="small"
          color={StyleGuide.colorPalette.black}
        />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
