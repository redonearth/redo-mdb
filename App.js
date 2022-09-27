import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

export default function App() {
  const [fonts] = useFonts([Ionicons.font]);
  const [assets] = useAssets([require('./redonearth.png')]);

  useEffect(() => {
    async function prefare() {
      // SplashScreen.preventAutoHideAsync();
      await SplashScreen.hideAsync();
    }
    prefare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fonts && assets) {
      await SplashScreen.hideAsync();
    }
  }, [fonts, assets]);
  if (!fonts && !assets) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayout}>
      <Root />
    </NavigationContainer>
  );
}
