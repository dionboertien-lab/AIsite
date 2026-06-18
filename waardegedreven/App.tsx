import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigator from './src/navigation'
import { KernProvider, useKern } from './src/store/KernContext'
import { KLEUREN } from './src/constants/kleuren'

function Wortel() {
  const { laden, onboardingKlaar } = useKern()

  if (laden) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: KLEUREN.primair }}>
        <ActivityIndicator color={KLEUREN.accent} size="large" />
      </View>
    )
  }

  return <AppNavigator onboardingKlaar={onboardingKlaar} />
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KernProvider>
        <Wortel />
      </KernProvider>
    </GestureHandlerRootView>
  )
}
