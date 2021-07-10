import { Player, TaskInput } from "components";
import MissionTitle from "components/MissionTitle";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { IMissionTaskProps, TaskFreeAnswer } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props extends Pick<TaskFreeAnswer, "params">, IMissionTaskProps {
  isLoading: boolean;
}

const TypeMission = (props: Props) => {
  const { onComplete, title, isLoading, params } = props;

  const handleOnSubmit = useCallback(onComplete, [onComplete]);

  return (
    <View style={styles.container}>
      <MissionTitle title={title} />
      <Player sound={params.sound} />
      <TaskInput onSubmit={handleOnSubmit} isLoading={isLoading} />
    </View>
  );
};

export default TypeMission;
