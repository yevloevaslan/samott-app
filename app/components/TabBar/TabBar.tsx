import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { isX, RoutesNames, StyleGuide, TabBarType, TABS } from "utils";
import Tab from "./Tab";

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: StyleGuide.colorPalette.white,
  },
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
    elevation: 10,
    marginBottom: isX ? 30 : 0,
  },
});

const TabBar = (props: BottomTabBarProps<BottomTabBarOptions>) => {
  const [selectedTab, setSelectedTab] = useState<RoutesNames>(
    RoutesNames.MISSIONS
  );

  const handleOnPress = useCallback(
    (index: number) => {
      let screen = TABS.find((tab) => tab.index === index)?.routeName;

      if (screen) {
        setSelectedTab(screen);
        props.navigation.navigate(screen);
      }
    },
    [props.navigation]
  );

  const renderTab = useCallback(
    (item: TabBarType, index: number) => {
      return (
        <Tab
          {...item}
          selected={selectedTab === item.routeName}
          key={index}
          onPress={handleOnPress}
        />
      );
    },
    [handleOnPress, selectedTab]
  );

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>{TABS.map(renderTab)}</View>
    </View>
  );
};

export default TabBar;
