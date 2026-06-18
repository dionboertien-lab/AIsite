import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

import WelkomScreen from '../screens/onboarding/WelkomScreen'
import GedragsIntakeScreen from '../screens/onboarding/GedragsIntakeScreen'
import ProfielRevealScreen from '../screens/onboarding/ProfielRevealScreen'
import GapMetingScreen from '../screens/onboarding/GapMetingScreen'
import HomeScreen from '../screens/main/HomeScreen'
import ReflectieScreen from '../screens/main/ReflectieScreen'
import ProfielScreen from '../screens/main/ProfielScreen'
import { KLEUREN } from '../constants/kleuren'
import { IntakeResultaat } from '../lib/algoritme'
import { VraagAntwoord } from '../lib/algoritme/types'

export type OnboardingStackParams = {
  Welkom: undefined
  GedragsIntake: undefined
  ProfielReveal: { antwoorden: VraagAntwoord[]; resultaat: IntakeResultaat }
  GapMeting: { antwoorden: VraagAntwoord[]; resultaat: IntakeResultaat }
}

export type MainTabParams = {
  Home: undefined
  Reflectie: undefined
  Profiel: undefined
}

export type RootStackParams = {
  Onboarding: undefined
  Main: undefined
}

const RootStack = createNativeStackNavigator<RootStackParams>()
const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>()
const MainTab = createBottomTabNavigator<MainTabParams>()

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Welkom" component={WelkomScreen} />
      <OnboardingStack.Screen name="GedragsIntake" component={GedragsIntakeScreen} />
      <OnboardingStack.Screen name="ProfielReveal" component={ProfielRevealScreen} />
      <OnboardingStack.Screen name="GapMeting" component={GapMetingScreen} />
    </OnboardingStack.Navigator>
  )
}

function TabIcon({ naam, gefocust }: { naam: string; gefocust: boolean }) {
  const iconen: Record<string, string> = { Home: '◉', Reflectie: '✦', Profiel: '◎' }
  return (
    <Text style={{ fontSize: 20, color: gefocust ? KLEUREN.accent : KLEUREN.tekstLicht }}>
      {iconen[naam] ?? '●'}
    </Text>
  )
}

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon naam={route.name} gefocust={focused} />,
        tabBarActiveTintColor: KLEUREN.accent,
        tabBarInactiveTintColor: KLEUREN.tekstLicht,
        tabBarStyle: {
          backgroundColor: KLEUREN.kaart,
          borderTopColor: KLEUREN.border,
        },
        tabBarLabelStyle: { fontSize: 11 },
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <MainTab.Screen name="Reflectie" component={ReflectieScreen} options={{ title: 'Reflectie' }} />
      <MainTab.Screen name="Profiel" component={ProfielScreen} options={{ title: 'Profiel' }} />
    </MainTab.Navigator>
  )
}

export default function AppNavigator({ onboardingKlaar }: { onboardingKlaar: boolean }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {onboardingKlaar ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
