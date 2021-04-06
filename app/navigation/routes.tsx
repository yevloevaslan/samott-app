import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackProps, RoutesNames } from "../utils";
import Screens from "../screens";

const Stack = createStackNavigator<HomeStackProps>();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesNames.PHONE_ENTER}
    >
      <Stack.Screen
        name={RoutesNames.PHONE_ENTER}
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
      <Stack.Screen name={RoutesNames.HOME} component={Screens.Home} />
    </Stack.Navigator>
  );
};

export default Routes;
