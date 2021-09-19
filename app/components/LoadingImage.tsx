import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, ImageProps, View } from "react-native";
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

  const handleOnLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
            },
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
