import { StackScreenProps } from "@react-navigation/stack";
import {
  Avatar,
  Bubble,
  Button,
  Typography,
  withBackgroundHoc,
} from "components";
import { UserController } from "lib";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useUser } from "redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
  UserActionsTypes,
} from "utils";

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
    width: 380,
    height: 380,
  },
  modalActionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 43,
    width: "100%",
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
  bubbleContent: {
    paddingLeft: 5,
    paddingBottom: 5,
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.PIN_PHOTO> {}

function PinPhoto(props: Props) {
  const { setUser } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<
    Parameters<ImagePicker.Callback>[0]
  >({});

  const handleOnAvatarPress = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (photo) => {
      if (photo.uri) {
        setIsModal(true);
        setSelectedPhoto(photo);
      }
    });
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const handleOnAcceptImagePress = useCallback(() => {
    setUser(UserActionsTypes.SET_PHOTO, { photo: selectedPhoto });
    if (selectedPhoto.uri && selectedPhoto.type) {
      UserController.uploadUserPhoto(
        selectedPhoto.uri,
        selectedPhoto.fileName || "",
        selectedPhoto.type
      );
    }
    handleOnCloseModal();
  }, [handleOnCloseModal, selectedPhoto, setUser]);

  const handleOnSubmitButtonPress = useCallback(() => {
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: RoutesNames.TAB_NAVIGATOR,
        },
      ],
    });
  }, [props.navigation]);

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
          style={styles.bubbleContent}
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
      <Button onPress={handleOnSubmitButtonPress} style={styles.button}>
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
            {selectedPhoto.uri ? (
              <Image
                source={{ uri: selectedPhoto.uri }}
                style={styles.selectedPhoto}
              />
            ) : null}
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
