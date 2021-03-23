import React, { useEffect } from "react";
import { LogBox, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import useStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreAllLogs();

const AppContent = () => {
  return (
    <NavigationContainer>
      <View />
    </NavigationContainer>
  );
};

function App() {
  const { store, persistor } = useStore();
  useEffect(() => SplashScreen.hide(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
