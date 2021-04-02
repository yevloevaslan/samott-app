import React, { useEffect } from "react";
import { LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./navigation/routes";

LogBox.ignoreAllLogs();

const AppContent = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => SplashScreen.hide(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
