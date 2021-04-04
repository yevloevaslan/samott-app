import React, { useCallback, useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, View } from "react-native";
import {
  Avatar,
  Bubble,
  Button,
  Typography,
  withBackgroundHoc,
} from "../components";
import { BackgroundImages, StyleGuide, TypographyTypes } from "../utils";
import * as ImagePicker from "react-native-image-picker";
import { useUser } from "../redux/hooks";
import { UserActionsTypes } from "../redux/types";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
  },
  modalContentContainerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.colorPalette.gray45,
  },
  modalImageContainer: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
  },
  modalActionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 43,
  },
  selectedPhoto: {
    flexGrow: 1,
  },
  selectedPhotoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    borderBottomColor: StyleGuide.colorPalette.gray45,
    borderLeftColor: StyleGuide.colorPalette.gray45,
    borderRightColor: StyleGuide.colorPalette.gray45,
    borderTopColor: StyleGuide.colorPalette.gray45,
    borderBottomWidth: 23,
    borderTopWidth: 23,
    borderLeftWidth: 23,
    borderRightWidth: 23,
  },
  imageCropp: {
    width: "100%",
    height: "100%",
    borderRadius: Dimensions.get("screen").width / 2,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: StyleGuide.colorPalette.white,
  },
});

function PinPhoto() {
  const { setUser } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ uri: string }>({
    uri: "",
  });

  const handleOnAvatarPress = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (photo) => {
      setIsModal(true);
      if (photo.uri) {
        setSelectedPhoto({ uri: photo.uri });
      }
    });
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const handleOnAcceptImagePress = useCallback(() => {
    setUser(UserActionsTypes.SET_PHOTO, { photo: selectedPhoto });
    handleOnCloseModal();
  }, [handleOnCloseModal, selectedPhoto, setUser]);

  return (
    <View style={styles.container}>
      <Bubble
        from="left"
        titleType={TypographyTypes.NORMAL30}
        titleAlign="left"
        title="ПРИКРЕПИТЕ ФОТО"
        backgroundColor={StyleGuide.colorPalette.green}
      >
        <Typography
          numberOfLines={3}
          textAlign="left"
          type={TypographyTypes.NORMAL14}
        >
          Внимание! Фото может быть удалено,{"\n"}
          если оно противоречит правилам{"\n"}
          приложения и законодательству РФ
        </Typography>
      </Bubble>
      <Avatar
        onPress={handleOnAvatarPress}
        newPhoto
        size={{ w: 282, h: 282 }}
      />
      <Button style={styles.button}>
        <Typography textAlign="center">Продолжить</Typography>
      </Button>
      <Modal
        onRequestClose={handleOnCloseModal}
        animationType="fade"
        transparent={true}
        visible={isModal}
      >
        <View style={styles.modalContentContainerWrapper}>
          <View style={styles.modalImageContainer}>
            {selectedPhoto.uri && (
              <Image source={selectedPhoto} style={styles.selectedPhoto} />
            )}
            <View style={styles.selectedPhotoContainer}>
              <View style={styles.imageCropp} />
            </View>
          </View>
          <View style={styles.modalActionButtonContainer}>
            <TouchableOpacity onPress={handleOnCloseModal}>
              <Typography type={TypographyTypes.NORMAL24}>Отмена</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOnAcceptImagePress}>
              <Typography type={TypographyTypes.NORMAL24}>Готово</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default withBackgroundHoc(
  BackgroundImages.WITH_ORNAMENTS,
  true
)(PinPhoto);
