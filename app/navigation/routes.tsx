import React from "react";
import { TabBar } from "../components";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackProps, RoutesNames } from "../utils";
import Screens from "../screens";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator<HomeStackProps>();
const Tab = createBottomTabNavigator<HomeStackProps>();

const cardStyleInterpolator = ({ current }: { current: any }) => ({
  cardStyle: { opacity: current.progress },
});
const customTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={customTabBar}
      initialRouteName={RoutesNames.MISSIONS}
    >
      <Tab.Screen name={RoutesNames.MISSIONS} component={Screens.Missions} />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesNames.SPLASH}
    >
      <Stack.Screen
        options={{ cardStyleInterpolator }}
        name={RoutesNames.SPLASH}
        component={Screens.Splash}
      />
      <Stack.Screen
        name={RoutesNames.PHONE_ENTER}
        options={{ cardStyleInterpolator }}
        component={Screens.PhoneEnter}
      />
      <Stack.Screen
        name={RoutesNames.CODE_ENTER}
        component={Screens.CodeEnter}
      />
      <Stack.Screen
        name={RoutesNames.ERROR_CODE}
        component={Screens.ErrorCode}
      />
      <Stack.Screen name={RoutesNames.PROFILE} component={Screens.Profile} />
      <Stack.Screen
        options={{ cardStyleInterpolator }}
        name={RoutesNames.PIN_PHOTO}
        component={Screens.PinPhoto}
      />
      <Stack.Screen name={RoutesNames.TAB_NAVIGATOR} component={TabNavigator} />
      <Stack.Screen
        name={RoutesNames.PROFILE_SETTINGS}
        component={Screens.ProfileSettings}
      />
    </Stack.Navigator>
  );
};

export default Routes;
