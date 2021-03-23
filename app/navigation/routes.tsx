import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RoutesNames } from "./routesNames";
import { HomeStackProps } from "../utils";
import { Home, Login } from "../screens";

const Stack = createStackNavigator<HomeStackProps>();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RoutesNames.HOME}
    >
      <Stack.Screen name={RoutesNames.LOGIN} children={Login} />
      <Stack.Screen name={RoutesNames.HOME} children={Home} />
    </Stack.Navigator>
  );
}
