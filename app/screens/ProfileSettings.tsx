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
  BackButton,
  BorderedInput,
  RadioButton,
  Header,
  Typography,
  withBackgroundHoc,
} from "../components";
import { useArray } from "../hooks";
import { useUser } from "../redux/hooks";
import {
  BackgroundImages,
  HomeStackProps,
  RoutesNames,
  StyleGuide,
  TypographyTypes,
} from "../utils";
import * as ImagePicker from "react-native-image-picker";
import { UserActionsTypes } from "../redux/types";
import { TRASH_CAN } from "../assets/images";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingRight: 27,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleNameText: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  redTitleContainer: {
    flexDirection: "row",
    paddingVertical: 20,
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
  birthdayInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
});

interface Props
  extends StackScreenProps<HomeStackProps, RoutesNames.REGISTRATION> {}

function ProfileSettings(props: Props) {
  const { user, setUser } = useUser();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string | undefined>(
    user.firstName
  );
  const [middleName, setMiddleName] = useState<string | undefined>(
    user.middleName
  );
  const [lastName, setLastName] = useState<string | undefined>(user.lastName);
  const [email, setEmail] = useState<string | undefined>(user.email);
  const birthday = useArray<number | undefined>([
    user.birthday?.getDay(),
    user.birthday?.getMonth(),
    user.birthday?.getFullYear(),
  ]);

  const [isMale, setIsMale] = useState<boolean>(false);
  const [isFemale, setIsFemale] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ uri: string }>({
    uri: "",
  });

  const handleOnChangeDay = useCallback(
    (text?: string) => {
      birthday.setAt(0, Number(text));
    },
    [birthday]
  );

  const handleOnAvatarPress = useCallback(() => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (photo) => {
      if (photo.uri) {
        setIsModal(true);
        setSelectedPhoto({ uri: photo.uri });
      }
    });
  }, []);

  const handleOnChangeMonth = useCallback(
    (text?: string) => {
      birthday.setAt(1, Number(text));
    },
    [birthday]
  );

  const handleOnChangeYear = useCallback(
    (text?: string) => {
      birthday.setAt(2, Number(text));
    },
    [birthday]
  );

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

  return (
    <View style={styles.container}>
      <Header decorators="right">
        <View style={styles.redTitleContainer}>
          <View style={styles.titleNameContainer}>
            <BackButton navigation={props.navigation} />
            <Typography style={styles.titleNameText}>Настройки</Typography>
          </View>
        </View>
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
          <View style={styles.birthdayInputsContainer}>
            <BorderedInput
              textAlign="center"
              type="numbers-only"
              onChangeText={handleOnChangeDay}
              maxLength={2}
              style={styles.inputStyle}
              placeholder="ДД"
              value={String(birthday.getAt(0))}
            />
            <BorderedInput
              textAlign="center"
              type="numbers-only"
              maxLength={2}
              onChangeText={handleOnChangeMonth}
              style={styles.inputStyle}
              placeholder="ММ"
              value={String(birthday.getAt(1))}
            />
            <BorderedInput
              textAlign="center"
              type="numbers-only"
              maxLength={4}
              onChangeText={handleOnChangeYear}
              style={styles.inputStyle}
              placeholder="ГГГГ"
              value={String(birthday.getAt(2))}
            />
          </View>
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
