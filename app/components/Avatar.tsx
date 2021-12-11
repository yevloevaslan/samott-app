import { DEFAULT_AVATAR, PHOTO_CAMERA } from "assets/images";
import { Typography } from "components";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "redux/hooks";
import { StyleGuide, TypographyTypes } from "utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.colorPalette.gray,
    overflow: "visible",
  },
  avatarImage: {
    flexGrow: 1,
  },
  newPhotoContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: StyleGuide.colorPalette.mediumDarkGray,
    justifyContent: "center",
  },
  newPhotoImage: {
    flexGrow: 0.4,
  },
  nameContainer: {
    paddingVertical: 6,
    width: "100%",
    alignItems: "center",
    backgroundColor: StyleGuide.colorPalette.gray,
    position: "absolute",
    bottom: 0,
    borderRadius: 12,
  },
  loaderContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

interface Props {
  size?: { w: number; h: number };
  newPhoto?: boolean;
  onPress?: () => void;
  withName?: boolean;
  img?: string;
}

const Avatar = (props: Props) => {
  const { size = { w: 67, h: 67 }, newPhoto, onPress, withName } = props;
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerStyle = useMemo(
    () => [
      styles.container,
      { width: size.w, aspectRatio: 1, borderRadius: size.w / 2 },
    ],
    [size]
  );

  const avatarImageStyle = useMemo(
    () => [{ width: size.w, aspectRatio: 1 }, { borderRadius: size.w / 2 }],
    [size.w]
  );

  const newPhotoContainerImageStyle = useMemo(
    () => [
      styles.newPhotoContainer,
      {
        width: size.w * 0.36,
        height: size.h * 0.36,
        borderRadius: (size.w * 0.36) / 2,
      },
    ],
    [size]
  );

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={containerStyle}
    >
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={StyleGuide.colorPalette.black} />
        </View>
      )}
      <Image
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        defaultSource={DEFAULT_AVATAR}
        resizeMode="cover"
        source={
          props.img || user.img
            ? { uri: props.img || user.img }
            : DEFAULT_AVATAR
        }
        style={avatarImageStyle}
      />
      {withName && (
        <View style={styles.nameContainer}>
          <Typography type={TypographyTypes.NORMAL24}>
            {user.firstName.trim()}
          </Typography>
        </View>
      )}
      {newPhoto && (
        <View style={newPhotoContainerImageStyle}>
          <Image
            resizeMode="contain"
            source={PHOTO_CAMERA}
            style={styles.newPhotoImage}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
