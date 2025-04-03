import { Text, View, Image } from 'react-native';

import { Timer } from './Timer';

export const ScreenContent = () => {
  return (
    <View className="">
      <Image
        source={{
          uri: 'https://www.team-arkea-samsic.fr/wp-content/uploads/2025/02/application-running.webp',
        }}
        className="h-64 w-full"
      />
      <Text className="bg-pink-200 p-4 text-2xl font-semibold ">Super Sport App</Text>
      <Timer />
    </View>
  );
};
