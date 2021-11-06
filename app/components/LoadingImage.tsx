import { BROKEN_FILE } from "assets/images";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageProps,
  StyleSheet,
  View,
} from "react-native";
import { StyleGuide } from "utils";

interface Props extends ImageProps {
  indicatorColor?: string;
}

export default function LoadingImage(props: Props) {
  const {
    indicatorColor = StyleGuide.colorPalette.white,
    ...imageProps
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrored, setIsErrored] = useState<boolean>(false);

  const handleOnLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const onError = useCallback<Required<Image["props"]>["onError"]>(() => {
    setIsErrored(true);
    setIsLoading(false);
  }, []);

  const renderImage = useCallback(() => {
    if (isLoading) {
      return (
        <View style={[styles.loaderContainer, imageProps.style]}>
          <ActivityIndicator color={indicatorColor} />
        </View>
      );
    }
    return null;
  }, [imageProps.style, indicatorColor, isLoading]);

  const imageStyles = useMemo(
    () => [
      props.style,
      isErrored
        ? {
            aspectRatio: 1,
            width: 32,
            borderRadius: 0,
          }
        : null,
    ],
    [isErrored, props.style]
  );

  return (
    <>
      {renderImage()}
      <Image
        {...imageProps}
        source={isErrored ? BROKEN_FILE : imageProps.source}
        style={imageStyles}
        onError={onError}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={handleOnLoadEnd}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 22,
  },
});
