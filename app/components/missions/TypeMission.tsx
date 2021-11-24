import { Player, TaskInput } from "components";
import MissionTitle from "components/MissionTitle";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { IMissionTaskProps, TaskFreeAnswer } from "utils";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

interface Props extends Pick<TaskFreeAnswer, "params">, IMissionTaskProps {
  isLoading: boolean;
  onError(): void;
}

const TypeMission = (props: Props) => {
  const { onComplete, title, isLoading, params, onError } = props;

  const handleOnSubmit = useCallback(onComplete, [onComplete]);

  return (
    <View style={styles.container}>
      <MissionTitle title={title} />
      <Player sound={params.sound} onError={onError} />
      <TaskInput onSubmit={handleOnSubmit} isLoading={isLoading} />
    </View>
  );
};

export default TypeMission;
