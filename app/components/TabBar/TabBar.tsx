import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { RoutesNames, StyleGuide, TabBarType, TABS } from "../../utils";
import Tab from "./Tab";

const styles = StyleSheet.create({
  container: {
    height: 93,
    width: "100%",
    backgroundColor: StyleGuide.colorPalette.white,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    shadowColor: StyleGuide.colorPalette.black,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
});

const TabBar = (props: BottomTabBarProps<BottomTabBarOptions>) => {
  const handleOnPress = useCallback(
    (index: number) => {
      const screen =
        TABS.find((tab) => tab.index === index)?.routeName ||
        RoutesNames.MISSIONS;

      props.navigation.navigate(screen);
    },
    [props.navigation]
  );

  const renderTab = useCallback(
    (item: TabBarType, index: number) => {
      return <Tab {...item} key={index} onPress={handleOnPress} />;
    },
    [handleOnPress]
  );

  return <View style={styles.container}>{TABS.map(renderTab)}</View>;
};

export default TabBar;
