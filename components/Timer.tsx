import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export const Timer = () => {
  const [effortTime, setEffortTime] = useState(45);
  const [restTime, setRestTime] = useState(15);
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [time, setTime] = useState(effortTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEffort, setIsEffort] = useState(true); // quand isEffort est true mode effort sinon mode repos

  useEffect(() => {
    if (!isRunning) {
      setTime(effortTime);
    }
  }, [effortTime]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isRunning && rounds > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) return prevTime - 1;

          if (currentRound >= rounds && !isEffort) {
            clearInterval(timer);
            return 0;
          }

          setIsEffort(!isEffort);
          setCurrentRound((prev) => (!isEffort ? prev + 1 : prev));
          return isEffort ? restTime : effortTime;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, isEffort, currentRound, rounds, effortTime, restTime]);

  const resetTimer = () => {
    setIsRunning(false);
    setIsEffort(true);
    setCurrentRound(1);
    setTime(effortTime);
  };

  return (
    <View className="mx-auto flex h-full w-full max-w-md rounded-lg bg-pink-50 p-6 pt-4 shadow-md">
      <Text className="mb-2 text-center text-2xl font-semibold text-pink-800">
        Set up your training
      </Text>
      <View className="mt-4 flex flex-row justify-between">
        <View className="flex items-center">
          <Text className="text-lg font-medium">Effort</Text>
          <TextInput
            className="mt-2 w-20 rounded-2xl bg-pink-200 p-2 text-center"
            keyboardType="numeric"
            value={effortTime.toString()}
            onChangeText={(text) => setEffortTime(parseInt(text, 10) || 0)}
          />
        </View>
        <View className="flex items-center">
          <Text className="text-lg font-medium">Rest</Text>
          <TextInput
            className="mt-2 w-20 rounded-2xl bg-pink-200 p-2 text-center"
            keyboardType="numeric"
            value={restTime.toString()}
            onChangeText={(text) => setRestTime(parseInt(text, 10) || 0)}
          />
        </View>
        <View className="flex items-center">
          <Text className="text-lg font-medium">Round</Text>
          <TextInput
            className="mt-2 w-20 rounded-2xl bg-pink-200 p-2 text-center"
            keyboardType="numeric"
            value={rounds.toString()}
            onChangeText={(text) => setRounds(parseInt(text, 10) || 1)}
          />
        </View>
      </View>
      <View className="my-8 flex items-center justify-center">
        <View className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-4 border-blue-200 p-12 text-center">
          <Text className="text-2xl font-bold text-pink-800">{time}s</Text>
        </View>
      </View>
      <View className="">
        <Text className="text-center text-2xl font-medium text-pink-800">
          {isEffort ? 'Effort' : 'Repos'}
        </Text>
        <Text className=" text-center text-2xl font-medium text-pink-800">
          Round {currentRound} / {rounds}
        </Text>
      </View>

      <View className="mt-6 flex flex-row justify-center gap-x-4">
        <TouchableOpacity
          onPress={() => setIsRunning(!isRunning)}
          className="rounded-lg bg-blue-300 px-6 py-3 shadow-md">
          <Text className="text-lg font-bold text-white">{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetTimer}
          className="rounded-lg bg-pink-800 px-6 py-3 shadow-md">
          <Text className="text-lg font-bold text-white">Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
