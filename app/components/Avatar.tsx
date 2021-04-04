import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DEFAULT_AVATAR, PHOTO_CAMERA } from "../assets/images";
import { useUser } from "../redux/hooks";
import { StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.colorPalette.gray,
  },
  avatarImage: {
    flexGrow: 1,
  },
  newPhotoContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: StyleGuide.colorPalette.darkGray,
    justifyContent: "center",
  },
  newPhotoImage: {
    flexGrow: 0.4,
  },
});

interface Props {
  size?: { w: number; h: number };
  newPhoto?: boolean;
  onPress?: () => void;
}

const Avatar = (props: Props) => {
  const { size = { w: 67, h: 67 }, newPhoto, onPress } = props;
  const { user } = useUser();
  const containerStyle = useMemo(
    () => [
      styles.container,
      { width: size.w, height: size.h, borderRadius: size.w / 2 },
    ],
    [size]
  );

  const avatarImageStyle = useMemo(
    () => [styles.avatarImage, { borderRadius: size.w / 2 }],
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
      <Image
        resizeMode="cover"
        source={user.photo || DEFAULT_AVATAR}
        style={avatarImageStyle}
      />
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
