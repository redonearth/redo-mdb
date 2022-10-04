import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import COLORS from '../colors';
import Detail from '../screens/Detail';
import { Movie, TV } from '../api';

export type RootStackParamList = {
  Detail: Movie | TV;
};

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export default function Stack() {
  const isDark = useColorScheme() === 'dark';

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? COLORS.black : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : COLORS.black,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
