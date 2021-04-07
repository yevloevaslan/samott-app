import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  BorderedInput,
  RadioButton,
  Header,
  Typography,
  withBackgroundHoc,
  DatePicker,
  Button,
} from "../components";
import { useUser } from "../redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  IUserInfo,
  RESET_APP,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";
import * as ImagePicker from "react-native-image-picker";
import { UserActionsTypes } from "../redux/types";
import { EXIT, TRASH_CAN } from "../assets/images";
import { useDispatch } from "react-redux";
import { UserController } from "../lib";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingRight: 27,
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  inputStyle: {
    marginBottom: 15,
  },
  birthdayContainer: {
    marginBottom: 20,
  },
  birthdayInputsContainerTitle: {
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  sexContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
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
  trashCanIcon: {
    height: 43,
    width: 31,
    marginRight: 20,
  },
  deleteAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "center",
  },
  exitIconContainer: {
    width: 44,
    height: 41,
  },
  exitIcon: {
    flexGrow: 1,
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.REGISTRATION> {}

function ProfileSettings(props: Props) {
  const { user, setUser } = useUser();
  const userController = UserController();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string | undefined>(
    user.firstName
  );
  const [middleName, setMiddleName] = useState<string | undefined>(
    user.middleName
  );
  const [lastName, setLastName] = useState<string | undefined>(user.lastName);
  const [email, setEmail] = useState<string | undefined>(user.email);
  const [birthday, setBirthday] = useState<Date | undefined>(user.birthday);
  const [isMale, setIsMale] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ uri: string }>({
    uri: "",
  });
  const [isPicker, setIsPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnAvatarPress = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (photo) => {
      if (photo.uri) {
        setIsModal(true);
        setSelectedPhoto({ uri: photo.uri });
      }
    });
  }, []);

  const handleOnFemaleSexPress = useCallback((isSetted?: boolean) => {
    if (isSetted) {
      setIsFemale(isSetted);
      setIsMale(false);
    }
  }, []);

  const handleOnMaleSexPress = useCallback((isSetted?: boolean) => {
    if (isSetted !== undefined) {
      setIsMale(isSetted);
      setIsFemale(false);
    }
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const handleOnAcceptImagePress = useCallback(() => {
    setUser(UserActionsTypes.SET_PHOTO, { photo: selectedPhoto });
    handleOnCloseModal();
  }, [handleOnCloseModal, selectedPhoto, setUser]);

  const handleOnSubmitButtonPress = useCallback(async () => {
    const userInfo: Partial<IUserInfo> = {
      lastName: lastName || user.lastName,
      middleName: middleName || user.middleName,
      firstName: firstName || user.firstName,
      birthday,
    };
    setIsLoading(true);
    const response = await userController.userPutInfo(userInfo);
    if (response) {
      await userController.userGetInfo();
    }
    setIsLoading(false);
  }, [
    birthday,
    firstName,
    lastName,
    middleName,
    user.firstName,
    user.lastName,
    user.middleName,
    userController,
  ]);

  const handleOnExitButtonPress = useCallback(async () => {
    props.navigation.navigate(RoutesNames.PHONE_ENTER);
    dispatch({ type: RESET_APP });
  }, [dispatch, props.navigation]);

  const handleOnChangeBirthDay = useCallback(
    (date?: Date) => {
      setBirthday(date || birthday);
      setIsPicker(false);
    },
    [birthday]
  );

  const handleOnOpenPicker = useCallback(() => {
    setIsPicker(true);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title="Настройки"
        justifyContent="space-between"
        decorators="right"
      >
        <TouchableOpacity
          style={styles.exitIconContainer}
          onPress={handleOnExitButtonPress}
        >
          <Image source={EXIT} style={styles.exitIcon} />
        </TouchableOpacity>
      </Header>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Avatar newPhoto onPress={handleOnAvatarPress} />
        </View>
        <BorderedInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputStyle}
          placeholder="Имя"
        />
        <BorderedInput
          value={middleName}
          onChangeText={setMiddleName}
          style={styles.inputStyle}
          placeholder="Фамилия"
        />
        <BorderedInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.inputStyle}
          placeholder="Отчество"
        />
        <View style={styles.birthdayContainer}>
          <Typography
            color={StyleGuide.colorPalette.gray}
            type={TypographyTypes.NORMAL24}
            style={styles.birthdayInputsContainerTitle}
          >
            Дата рождения
          </Typography>
          <DatePicker
            onOpen={handleOnOpenPicker}
            isPicker={isPicker}
            value={birthday}
            onChange={handleOnChangeBirthDay}
          />
        </View>
        <Typography
          color={StyleGuide.colorPalette.gray}
          type={TypographyTypes.NORMAL24}
          style={styles.birthdayInputsContainerTitle}
        >
          Ваш пол
        </Typography>
        <View style={styles.sexContainer}>
          <RadioButton value={isMale} onPress={handleOnMaleSexPress}>
            <Typography color={StyleGuide.colorPalette.black}>
              Мужской
            </Typography>
          </RadioButton>
          <RadioButton value={isFemale} onPress={handleOnFemaleSexPress}>
            <Typography color={StyleGuide.colorPalette.black}>
              Женский
            </Typography>
          </RadioButton>
        </View>
        <BorderedInput
          value={email}
          onChangeText={setEmail}
          type="email"
          placeholder="example@email.exm"
        />
        <Button
          onPress={handleOnSubmitButtonPress}
          style={styles.submitButton}
          isLoading={isLoading}
        >
          <Typography>Подтвердить изменения</Typography>
        </Button>
        <TouchableOpacity style={styles.deleteAccountButton}>
          <Image source={TRASH_CAN} style={styles.trashCanIcon} />
          <Typography
            color={StyleGuide.colorPalette.gray}
            type={TypographyTypes.NORMAL18}
          >
            Удалить аккаунт
          </Typography>
        </TouchableOpacity>
      </View>
      <Modal
        onRequestClose={handleOnCloseModal}
        animationType="fade"
        transparent={true}
        visible={isModal}
      >
        <View style={styles.modalContentContainerWrapper}>
          <View style={styles.modalImageContainer}>
            {selectedPhoto.uri ? (
              <Image source={selectedPhoto} style={styles.selectedPhoto} />
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
)(ProfileSettings);
