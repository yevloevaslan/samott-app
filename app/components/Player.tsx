import { PAUSE_ICON, PLAY_ICON } from "assets/images";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  clockRunning,
  cond,
  Easing,
  eq,
  interpolate,
  or,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  useValue,
} from "react-native-reanimated";
import { StyleGuide } from "utils";
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";

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
    borderWidth: 1,
    borderColor: StyleGuide.colorPalette.black,
  },
  playerProgress: {
    height: "100%",
    flex: 1,
    backgroundColor: StyleGuide.colorPalette.green,
  },
});

interface Props {
  sound?: string;
}

export default function Player(props: Props) {
  const { sound } = props;
  const playbackState = usePlaybackState();
  const { duration } = useProgress();
  const [soundDuration, setSoundDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerWidth, setPlayerWidth] = useState<number>(0);
  const [isLoadErrored, setIsLoadErrored] = useState<boolean>(false);

  const playerProgress = useValue<number>(0);
  const isPLayingAnim = useValue<0 | 1 | 2>(0);
  const clock = new Animated.Clock();

  const state = {
    finished: new Animated.Value(0),
    time: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    position: new Animated.Value(0),
  };

  const config: Animated.TimingConfig = useMemo(
    () => ({
      toValue: 1,
      duration: soundDuration * (Platform.OS === "ios" ? 700 : 950),
      easing: Easing.sin,
    }),
    [soundDuration]
  );

  const setup = useCallback(async () => {
    if (sound) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([
        { url: sound, id: sound, title: sound, artist: sound },
      ]);
      if (Platform.OS === "ios") {
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        await TrackPlayer.pause();
      }
    }
  }, [sound]);

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    await TrackPlayer.pause();
    if (Platform.OS === "android") {
      await TrackPlayer.skip(0);
    }
    setIsPlaying(false);
    isPLayingAnim.setValue(2);
  });

  useTrackPlayerEvents([Event.PlaybackError], () => {
    setIsLoadErrored(true);
  });

  useEffect(() => {
    if (isLoadErrored) {
      Alert.alert("Произошла ошибка при загрузке.");
    }
  }, [isLoadErrored]);

  useEffect(() => {
    setSoundDuration(duration);
  }, [duration]);

  useEffect(() => {
    if (playbackState === State.Playing) {
      setIsPlaying(true);
      isPLayingAnim.setValue(1);
    } else if (playbackState === State.Paused) {
      setIsPlaying(false);
      isPLayingAnim.setValue(0);
    }
  }, [playbackState]);

  useEffect(() => {
    setup();
    return () => {
      TrackPlayer.reset();
    };
  }, [setup]);

  const handleOnSoundPlayPress = useCallback(async () => {
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    }
  }, [playbackState]);

  useCode(
    () => [
      cond(
        clockRunning(clock),
        [
          cond(eq(isPLayingAnim, 0), set(state.time, clock)),
          timing(clock, state, config),
        ],
        cond(eq(isPLayingAnim, 1), startClock(clock))
      ),
      cond(
        or(eq(state.finished, 1), eq(isPLayingAnim, 2)),
        [
          stopClock(clock),
          set(isPLayingAnim, 0),
          set(state.finished, 0),
          set(state.time, 0),
          set(state.frameTime, 0),
          set(state.position, 0),
          set(playerProgress, 0),
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

  if (!sound) {
    return null;
  }

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
