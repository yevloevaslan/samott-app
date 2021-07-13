import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TabBar } from "../components";
import Screens from "../screens";
import { HomeStackProps, RoutesNames } from "../utils";

const Stack = createStackNavigator<HomeStackProps>();
const Tab = createBottomTabNavigator<HomeStackProps>();

const cardStyleInterpolator = ({ current }: { current: any }) => ({
  cardStyle: { opacity: current.progress },
});
const customTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={customTabBar}>
      <Tab.Screen name={RoutesNames.HOME} component={Screens.Profile} />
      <Tab.Screen name={RoutesNames.MISSIONS} component={Screens.Missions} />
      <Tab.Screen
        name={RoutesNames.MISSIONS_PLAYGROUND}
        component={Screens.MissionsPlayground}
      />
      <Tab.Screen
        name={RoutesNames.DICTIONARY}
        component={Screens.Dictionary}
      />
      <Tab.Screen name={RoutesNames.SHARE} component={Screens.Share} />
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
      <Stack.Screen
        name={RoutesNames.PROJECT_INFO}
        component={Screens.ProjectInfo}
      />
    </Stack.Navigator>
  );
};

export default Routes;
