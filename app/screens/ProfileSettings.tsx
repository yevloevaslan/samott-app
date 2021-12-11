import { StackScreenProps } from "@react-navigation/stack";
import { EXIT } from "assets/images";
import {
  Alert,
  Avatar,
  BorderedInput,
  Bubble,
  Button,
  DatePicker,
  Header,
  RadioButton,
  Typography,
  withBackgroundHoc,
} from "components";
import { UserController } from "lib";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { useUser } from "redux/hooks";
import {
  BackgroundImages,
  deepEqual,
  HomeStackProps,
  IUserInfo,
  RESET_APP,
  RoutesNames,
  SCREEN_WIDTH,
  StyleGuide,
  TypographyTypes,
} from "utils";

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
    paddingBottom: 30,
    paddingTop: 28,
  },
  helloBubbleContainer: {
    marginBottom: 50,
    paddingHorizontal: 28,
  },
  inputStyle: {
    marginBottom: 20,
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
    width: SCREEN_WIDTH,
    aspectRatio: 1,
  },
  modalActionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 43,
  },
  selectedPhoto: {
    width: "100%",
    aspectRatio: 1,
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
  // trashCanIcon: {
  //   height: 43,
  //   width: 31,
  //   marginRight: 20,
  // },
  // deleteAccountButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingTop: 20,
  //   justifyContent: "center",
  // },
  exitIcon: {
    width: 26,
    aspectRatio: 1,
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
  },
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.PROFILE_SETTINGS> {}

function ProfileSettings(props: Props) {
  const { user, userInfo: oldInfo } = useUser();
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
  const [birthday, setBirthday] = useState<Date | undefined>(
    props.route.params.firstIn ? undefined : user.birthday
  );
  const [sex, setSex] = useState<"m" | "f" | undefined>(user.sex);
  const [selectedPhoto, setSelectedPhoto] = useState<
    Parameters<ImagePicker.Callback>[0]
  >({});
  const [isPicker, setIsPicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isExitAlert, setIsExitAlert] = useState<boolean>(false);

  const handleOnAvatarPress = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (photo) => {
      if (photo && photo.type) {
        setIsModal(true);
        //@ts-ignore
        setSelectedPhoto(photo);
      }
    });
  }, []);

  const handleOnFemaleSexPress = useCallback(() => {
    setSex((prev) => (prev === "f" ? undefined : "f"));
  }, []);

  const handleOnMaleSexPress = useCallback(() => {
    setSex((prev) => (prev === "m" ? undefined : "m"));
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setSelectedPhoto({});
    setIsModal(false);
  }, []);

  const handleOnAcceptImagePress = useCallback(() => {
    setIsModal(false);
  }, []);

  const handleOnSubmitButtonPress = useCallback(async () => {
    let img;
    setIsLoading(true);
    if (selectedPhoto.uri && selectedPhoto.type) {
      img = await UserController.uploadUserPhoto(
        selectedPhoto.uri,
        selectedPhoto.fileName || "",
        selectedPhoto.type
      );
      setSelectedPhoto({});
    }
    const userInfo: Partial<IUserInfo> = {
      lastName: lastName || user.lastName,
      middleName: middleName || user.middleName,
      firstName: firstName || user.firstName,
      birthday: birthday ? birthday : undefined,
      email,
      sex,
      img,
    };
    const response = await UserController.userPutInfo(userInfo);

    if (response) {
      await UserController.userGetInfo();
      if (props.route.params.firstIn) {
        props.navigation.navigate(RoutesNames.PIN_PHOTO);
      }
    }
    setIsLoading(false);
  }, [
    birthday,
    email,
    firstName,
    lastName,
    middleName,
    props.navigation,
    props.route.params.firstIn,
    selectedPhoto.fileName,
    selectedPhoto.type,
    selectedPhoto.uri,
    sex,
    user.firstName,
    user.lastName,
    user.middleName,
  ]);

  const handleOnExitButtonPress = useCallback(async () => {
    setIsExitAlert(true);
  }, []);

  const handleOnExit = useCallback(() => {
    setIsExitAlert(false);
    props.navigation.navigate(RoutesNames.PHONE_ENTER);
    dispatch({ type: RESET_APP });
  }, [dispatch, props.navigation]);

  const handleOnChangeBirthDay = useCallback((date?: Date) => {
    setBirthday(date);
    setIsPicker(false);
  }, []);

  const handleOnOpenPicker = useCallback(() => {
    setIsPicker(true);
  }, []);

  // const handleOnDeleteButtonPress = useCallback(() => {
  //   setIsAlert(true);
  // }, []);

  const handleOnDeleteAccount = useCallback(() => setIsAlert(false), []);

  const isSubmitButtonDisabled = useMemo(() => {
    const { birthday: oldBirthday, ...withoutBirthday } = oldInfo;

    return deepEqual(
      { birthday: oldBirthday?.toISOString(), ...withoutBirthday },
      {
        firstName,
        lastName,
        middleName,
        email,
        sex,
        img: selectedPhoto.uri || oldInfo.img,
        birthday: birthday?.toISOString(),
      }
    );
  }, [
    birthday,
    email,
    firstName,
    lastName,
    middleName,
    oldInfo,
    selectedPhoto.uri,
    sex,
  ]);

  return (
    <View style={styles.container}>
      {props.route.params.firstIn ? (
        <View style={styles.helloBubbleContainer}>
          <Bubble
            backgroundColor={StyleGuide.colorPalette.green}
            from="left"
            titleType={TypographyTypes.BOLD34}
            titleAlign="left"
            title={"ДАВАЙТЕ\nПОЗНАКОМИМСЯ!"}
          />
        </View>
      ) : (
        <Header
          onBackButtonPress={props.navigation.goBack}
          title="Настройки"
          justifyContent="space-between"
          decorators="right"
        >
          <TouchableOpacity onPress={handleOnExitButtonPress}>
            <Image source={EXIT} style={styles.exitIcon} />
          </TouchableOpacity>
        </Header>
      )}
      <View style={styles.contentContainer}>
        {!props.route.params.firstIn && (
          <View style={styles.avatarContainer}>
            <Avatar
              newPhoto
              img={selectedPhoto.uri}
              onPress={handleOnAvatarPress}
            />
          </View>
        )}
        <BorderedInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.inputStyle}
          placeholder="Имя"
        />
        <BorderedInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.inputStyle}
          placeholder="Фамилия"
        />
        <BorderedInput
          value={middleName}
          onChangeText={setMiddleName}
          style={styles.inputStyle}
          placeholder="Отчество"
        />
        <View style={styles.birthdayContainer}>
          <Typography
            color={StyleGuide.colorPalette.gray}
            type={TypographyTypes.NORMAL18}
            style={styles.birthdayInputsContainerTitle}
          >
            Дата рождения (необязательно)
          </Typography>
          <DatePicker
            onOpen={handleOnOpenPicker}
            isPicker={isPicker}
            value={birthday}
            onChange={handleOnChangeBirthDay}
            onCancel={() => {
              setBirthday(undefined);
              setIsPicker(false);
            }}
          />
        </View>
        <Typography
          color={StyleGuide.colorPalette.gray}
          type={TypographyTypes.NORMAL18}
          style={styles.birthdayInputsContainerTitle}
        >
          Ваш пол (необязательно)
        </Typography>
        <View style={styles.sexContainer}>
          <RadioButton value={sex === "m"} onPress={handleOnMaleSexPress}>
            <Typography
              type={TypographyTypes.NORMAL18}
              color={StyleGuide.colorPalette.black}
            >
              Мужской
            </Typography>
          </RadioButton>
          <RadioButton value={sex === "f"} onPress={handleOnFemaleSexPress}>
            <Typography
              type={TypographyTypes.NORMAL18}
              color={StyleGuide.colorPalette.black}
            >
              Женский
            </Typography>
          </RadioButton>
        </View>
        <BorderedInput
          value={email}
          onChangeText={setEmail}
          type="email"
          placeholder="example@email.exm (необязательно)"
        />
        <Button
          onPress={handleOnSubmitButtonPress}
          style={styles.submitButton}
          isLoading={isLoading}
          disabled={isSubmitButtonDisabled}
        >
          <Typography type={TypographyTypes.NORMAL18}>
            {props.route.params.firstIn
              ? "Продолжить"
              : "Подтвердить изменения"}
          </Typography>
        </Button>
        {/* {!props.route.params.firstIn && (
          <TouchableOpacity
            onPress={handleOnDeleteButtonPress}
            style={styles.deleteAccountButton}
          >
            <Image source={TRASH_CAN} style={styles.trashCanIcon} />
            <Typography
              color={StyleGuide.colorPalette.gray}
              type={TypographyTypes.NORMAL18}
            >
              Удалить аккаунт
            </Typography>
          </TouchableOpacity>
        )} */}
      </View>
      <Alert
        visible={isAlert}
        title="Удалить аккаунт?"
        buttons={[
          { text: "Нет", onPress: () => setIsAlert(false) },
          { text: "Да", onPress: handleOnDeleteAccount },
        ]}
        warning="Внимание! Все ваши результаты будут удалены!"
      />
      <Alert
        visible={isExitAlert}
        title="Выйти из приложения?"
        buttons={[
          { text: "Нет", onPress: () => setIsExitAlert(false) },
          { text: "Да", onPress: handleOnExit },
        ]}
      />
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
                resizeMode="stretch"
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
)(ProfileSettings);
