import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Tabs', { screen: 'Search' })}>
    <Text>Go to Search</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
}
