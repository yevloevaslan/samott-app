import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackProps, RoutesNames } from "../utils";
import Screens from "../screens";

const Stack = createStackNavigator<HomeStackProps>();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesNames.LOGIN}
    >
      <Stack.Screen name={RoutesNames.LOGIN} component={Screens.Login} />
      <Stack.Screen name={RoutesNames.HOME} component={Screens.Home} />
    </Stack.Navigator>
  );
};

export default Routes;
