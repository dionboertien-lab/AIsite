import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OnboardingStackParams } from '../../navigation'
import { KLEUREN } from '../../constants/kleuren'

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'Welkom'>
}

export default function WelkomScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={stijlen.container}>
      <View style={stijlen.inhoud}>
        <View style={stijlen.logo}>
          <Text style={stijlen.logoTekst}>◎</Text>
        </View>

        <View style={stijlen.tekstBlok}>
          <Text style={stijlen.titel}>Wie ben jij{'\n'}— echt?</Text>
          <Text style={stijlen.subtitel}>
            Niet wat je zegt.{'\n'}Wat je doet.
          </Text>
          <Text style={stijlen.beschrijving}>
            Waardegedreven ontdekt jouw waarden via je gedrag — en laat zien hoe dicht
            je bij jezelf leeft. Tien vragen. Geen goede of foute antwoorden.
          </Text>
        </View>

        <View style={stijlen.onderaan}>
          <TouchableOpacity
            style={stijlen.knop}
            onPress={() => navigation.navigate('GedragsIntake')}
          >
            <Text style={stijlen.knopTekst}>Begin</Text>
          </TouchableOpacity>
          <Text style={stijlen.tijdIndicator}>~ 10 minuten</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const stijlen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KLEUREN.primair,
  },
  inhoud: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  logo: {
    alignItems: 'flex-start',
    marginTop: 16,
  },
  logoTekst: {
    fontSize: 36,
    color: KLEUREN.accent,
  },
  tekstBlok: {
    flex: 1,
    justifyContent: 'center',
  },
  titel: {
    fontSize: 48,
    fontWeight: '700',
    color: KLEUREN.wit,
    lineHeight: 56,
    marginBottom: 20,
  },
  subtitel: {
    fontSize: 22,
    color: KLEUREN.accentZacht,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 24,
  },
  beschrijving: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 24,
  },
  onderaan: {
    gap: 12,
  },
  knop: {
    backgroundColor: KLEUREN.accent,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  knopTekst: {
    color: KLEUREN.wit,
    fontSize: 18,
    fontWeight: '700',
  },
  tijdIndicator: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
  },
})
