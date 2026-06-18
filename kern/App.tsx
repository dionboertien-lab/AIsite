import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigator from './src/navigation'
import { isOnboardingKlaar } from './src/lib/storage'
import { KLEUREN } from './src/constants/kleuren'

export default function App() {
  const [laden, setLaden] = useState(true)
  const [onboardingKlaar, setOnboardingKlaar] = useState(false)

  useEffect(() => {
    isOnboardingKlaar().then((klaar) => {
      setOnboardingKlaar(klaar)
      setLaden(false)
    })
  }, [])

  if (laden) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: KLEUREN.primair }}>
        <ActivityIndicator color={KLEUREN.accent} size="large" />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator onboardingKlaar={onboardingKlaar} />
    </GestureHandlerRootView>
  )
}
