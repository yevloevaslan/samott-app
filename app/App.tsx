import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LogBox } from "react-native";
// @ts-ignore
import { AdMobInterstitial } from "react-native-admob";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ADV_UNIT } from "utils";
import Routes from "./navigation/routes";
import { persistor, store } from "./redux/store";

LogBox.ignoreAllLogs();

const App = () => {
  const [routesChangeCount, setRoutesChangeCount] = useState<number>(0);
  const timer = useRef<any>();

  const handleOnRequestAd = useCallback(async () => {
    try {
      await AdMobInterstitial.requestAd();
    } catch (e) {}
  }, []);

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(ADV_UNIT);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.addEventListener("adLoaded", () => {
      try {
        AdMobInterstitial.showAd();
      } catch (e) {}
    });
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (routesChangeCount === 7) {
      timer.current = setTimeout(() => {
        handleOnRequestAd();
        setRoutesChangeCount(0);
      }, 20000);
    }
  }, [routesChangeCount]);

  const handleOnNavigationStateChange = useCallback(() => {
    setRoutesChangeCount((prev) => prev + 1);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer onStateChange={handleOnNavigationStateChange}>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
