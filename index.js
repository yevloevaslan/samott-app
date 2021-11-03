/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";

TrackPlayer.setupPlayer({}).then(async () => {});

AppRegistry.registerComponent(appName, () => App);
