import { PAUSE_ICON, PLAY_ICON } from "assets/images";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  and,
  clockRunning,
  cond,
  Easing,
  eq,
  interpolate,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  useValue,
} from "react-native-reanimated";
import SoundPlayer, { SoundPlayerEventData } from "react-native-sound-player";
import { StyleGuide } from "utils";

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 33,
  },
  playSoundButton: {
    borderRadius: 26,
    padding: 11,
    backgroundColor: StyleGuide.colorPalette.green,
    marginRight: 10,
  },
  playerButtonImage: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  playerProgressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: StyleGuide.colorPalette.gray45,
    overflow: "hidden",
    borderRadius: 3,
  },
  playerProgress: {
    height: "100%",
    flex: 1,
    backgroundColor: StyleGuide.colorPalette.green,
  },
});

interface Props {
  sound: string;
}

export default function Player(props: Props) {
  const { sound } = props;
  const [soundDuration, setSoundDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerWidth, setPlayerWidth] = useState<number>(0);

  const playerProgress = useValue<number>(0);
  const isPLayingAnim = useValue<0 | 1>(0);
  const clock = new Animated.Clock();

  const state = {
    finished: new Animated.Value(0),
    time: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    position: new Animated.Value(0),
    started: new Animated.Value<number>(0),
  };

  const config: Animated.TimingConfig = useMemo(
    () => ({
      toValue: 1,
      duration: soundDuration * 1000,
      easing: Easing.ease,
    }),
    [soundDuration]
  );

  const finishedLoadingURL = useCallback(async (data: SoundPlayerEventData) => {
    if (data.success && data.url) {
      const { duration } = await SoundPlayer.getInfo();
      setSoundDuration(duration);
    }
  }, []);

  const finishedPLaying = useCallback(() => {
    setIsPlaying(false);
    SoundPlayer.seek(0);
  }, []);

  useEffect(() => {
    const finishedLoadingEvent = SoundPlayer.addEventListener(
      "FinishedLoading",
      finishedLoadingURL
    );
    const finishedLoadingUrlEvent = SoundPlayer.addEventListener(
      "FinishedLoadingURL",
      finishedLoadingURL
    );
    const finishedPlayingEvent = SoundPlayer.addEventListener(
      "FinishedPlaying",
      finishedPLaying
    );

    return () => {
      finishedLoadingEvent.remove();
      finishedLoadingUrlEvent.remove();
      finishedPlayingEvent.remove();
    };
  }, []);

  useEffect(() => {
    if (sound) {
      SoundPlayer.loadUrl(sound);
    }
  }, [sound]);

  const handleOnSoundPlayPress = useCallback(async () => {
    if (sound) {
      if (isPlaying) {
        SoundPlayer.pause();
        setIsPlaying(false);
        isPLayingAnim.setValue(0);
      } else {
        setIsPlaying(true);
        SoundPlayer.play();
        isPLayingAnim.setValue(1);
      }
    }
  }, [isPLayingAnim, isPlaying, sound]);

  useCode(
    () => [
      cond(
        clockRunning(clock),
        [
          cond(eq(isPLayingAnim, 0), set(state.time, clock)),
          timing(clock, state, config),
        ],
        cond(and(eq(isPLayingAnim, 1), eq(state.started, 0)), [
          set(state.started, 1),
          startClock(clock),
        ])
      ),
      cond(
        eq(state.finished, 1),
        [
          stopClock(clock),
          set(isPLayingAnim, 0),
          set(state.started, 0),
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          set(state.position, 0),
          set(playerProgress, state.position),
        ],
        set(playerProgress, state.position)
      ),
    ],
    [isPLayingAnim, config]
  );

  const handleOnPlayerLayout = useCallback((e: LayoutChangeEvent) => {
    setPlayerWidth(e.nativeEvent.layout.width);
  }, []);

  const playerProgressStyle = useMemo(
    () => [
      styles.playerProgress,
      {
        transform: [
          {
            translateX: interpolate(playerProgress, {
              inputRange: [0, 1],
              outputRange: [-playerWidth, 5],
            }),
          },
        ],
      },
    ],
    [playerProgress, playerWidth]
  );

  return (
    <View style={styles.playerContainer}>
      <TouchableOpacity
        disabled={soundDuration === 0}
        onPress={handleOnSoundPlayPress}
        style={styles.playSoundButton}
      >
        {soundDuration > 0 ? (
          <Image
            source={isPlaying ? PAUSE_ICON : PLAY_ICON}
            style={styles.playerButtonImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.playerButtonImage}>
            <ActivityIndicator color={StyleGuide.colorPalette.white} />
          </View>
        )}
      </TouchableOpacity>
      <View
        onLayout={handleOnPlayerLayout}
        style={styles.playerProgressContainer}
      >
        <Animated.View style={playerProgressStyle} />
      </View>
    </View>
  );
}