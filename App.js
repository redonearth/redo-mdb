import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadAssets = (assets) =>
  assets.map((asset) => {
    if (typeof asset === 'string') {
      return Image.prefetch(asset);
    } else {
      return Asset.loadAsync(asset);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prefare() {
      try {
        const fonts = loadFonts([Ionicons.font]);
        const assets = loadAssets([require('./redonearth.png')]);
        await Promise.all([...fonts, ...assets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    prefare();
  }, []);

  const onLayout = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <View onLayout={onLayout}>
      <Text>Hahaha</Text>
    </View>
  );
}
