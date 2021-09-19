import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageProps, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
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
  const opacityAnimValue = Animated.useValue<number>(0);

  const handleOnLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    Animated.timing(opacityAnimValue, {
      toValue: +!isLoading,
      duration: 250,
      easing: Easing.sin,
    }).start();
  }, [isLoading, opacityAnimValue]);

  return (
    <>
      {isLoading && (
        <View
          style={[
            { alignItems: "center", justifyContent: "center" },
            imageProps.style,
          ]}
        >
          <ActivityIndicator color={indicatorColor} />
        </View>
      )}
      <Image
        {...imageProps}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={handleOnLoadEnd}
      />
    </>
  );
}
