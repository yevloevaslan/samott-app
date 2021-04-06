import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SPLASH_LOGO } from "../assets/images";
import { useUser } from "../redux/hooks";
import { HomeStackProps, RoutesNames, StyleGuide } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.colorPalette.white,
  },
  logo: {
    flexGrow: 1,
  },
});

interface Props extends StackScreenProps<HomeStackProps, RoutesNames.SPLASH> {}

function Splash(props: Props) {
  const { user } = useUser();
  useEffect(() => {
    if (user.token !== "") {
      props.navigation.reset({
        index: 0,
        routes: [{ name: RoutesNames.TAB_NAVIGATOR }],
      });
    } else {
      props.navigation.reset({
        index: 0,
        routes: [{ name: RoutesNames.PHONE_ENTER }],
      });
    }
  }, [props.navigation, user.token]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={SPLASH_LOGO}
        resizeMethod="scale"
        resizeMode="contain"
      />
    </View>
  );
}

export default Splash;