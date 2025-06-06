import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/utils/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

