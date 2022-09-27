import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';

const NativeStack = createNativeStackNavigator();

export default function Root() {
  return (
    <NativeStack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <NativeStack.Screen name="Tabs" component={Tabs} />
      <NativeStack.Screen name="Stack" component={Stack} />
    </NativeStack.Navigator>
  );
}
