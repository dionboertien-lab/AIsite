import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native'
import Slider from '@react-native-community/slider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { OnboardingStackParams } from '../../navigation'
import { KLEUREN, gapKleur } from '../../constants/kleuren'
import {
  berekenProfiel, berekenGap, VraagAntwoord, WaardeNaam, WaardenScores, GebruikersProfiel,
} from '../../lib/algoritme'
import { slaProfielOp, markeerOnboardingKlaar } from '../../lib/storage'

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'GapMeting'>
  route: RouteProp<
    OnboardingStackParams & { GapMeting: { antwoorden: VraagAntwoord[]; top5: WaardeNaam[] } },
    'GapMeting'
  >
}

export default function GapMetingScreen({ navigation, route }: Props) {
  const params = (route.params as any) ?? {}
  const antwoorden: VraagAntwoord[] = params.antwoorden ?? []
  const top5: WaardeNaam[] = params.top5 ?? []

  const resultaat = berekenProfiel(antwoorden)

  const [importance, setImportance] = useState<WaardenScores>(resultaat.berekendImportance)
  const [lived, setLived] = useState<WaardenScores>(resultaat.berekendLived)

  async function slaOp() {
    const gap = berekenGap(importance, lived)
    const profiel: GebruikersProfiel = {
      id: Date.now().toString(),
      aangemaakt: new Date().toISOString(),
      baselineImportance: importance,
      baselineLived: lived,
      gapScores: gap,
      top5,
      profielVersie: 1,
      weekCount: 0,
    }
    await slaProfielOp(profiel)
    await markeerOnboardingKlaar()
    // Navigeer naar hoofdapp — reload via App.tsx state
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Main' }] })
  }

  return (
    <SafeAreaView style={stijlen.container}>
      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        <Text style={stijlen.label}>Jouw startpunt</Text>
        <Text style={stijlen.titel}>Hoe sterk leef je{'\n'}ze al?</Text>
        <Text style={stijlen.uitleg}>
          De linker balk is vooringevuld op basis van jouw antwoorden. Pas aan als het niet klopt.
        </Text>

        {top5.map((waarde) => {
          const imp = importance[waarde] ?? 5
          const liv = lived[waarde] ?? 5
          const gap = Math.max(0, imp - liv)

          return (
            <View key={waarde} style={stijlen.waardeBlok}>
              <View style={stijlen.waardeHeader}>
                <Text style={stijlen.waardeNaam}>{waarde}</Text>
                <View style={[stijlen.gapBadge, { backgroundColor: gapKleur(gap) + '22' }]}>
                  <Text style={[stijlen.gapTekst, { color: gapKleur(gap) }]}>
                    gap {gap.toFixed(1)}
                  </Text>
                </View>
              </View>

              <View style={stijlen.sliderRij}>
                <Text style={stijlen.sliderLabel}>Belang</Text>
                <Slider
                  style={stijlen.slider}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.5}
                  value={imp}
                  onValueChange={(v) => setImportance((prev) => ({ ...prev, [waarde]: v }))}
                  minimumTrackTintColor={KLEUREN.primair}
                  maximumTrackTintColor={KLEUREN.kaartSchaduw}
                  thumbTintColor={KLEUREN.primair}
                />
                <Text style={stijlen.sliderWaarde}>{imp.toFixed(1)}</Text>
              </View>

              <View style={stijlen.sliderRij}>
                <Text style={stijlen.sliderLabel}>Geleefd</Text>
                <Slider
                  style={stijlen.slider}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.5}
                  value={liv}
                  onValueChange={(v) => setLived((prev) => ({ ...prev, [waarde]: v }))}
                  minimumTrackTintColor={gapKleur(gap)}
                  maximumTrackTintColor={KLEUREN.kaartSchaduw}
                  thumbTintColor={gapKleur(gap)}
                />
                <Text style={stijlen.sliderWaarde}>{liv.toFixed(1)}</Text>
              </View>
            </View>
          )
        })}

        <TouchableOpacity style={stijlen.knop} onPress={slaOp}>
          <Text style={stijlen.knopTekst}>Dit klopt — start mijn journey</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const stijlen = StyleSheet.create({
  container: { flex: 1, backgroundColor: KLEUREN.achtergrond },
  inhoud: { padding: 24, gap: 20, paddingBottom: 40 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: KLEUREN.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  titel: { fontSize: 30, fontWeight: '700', color: KLEUREN.tekstPrimair, lineHeight: 38 },
  uitleg: { fontSize: 14, color: KLEUREN.tekstSecundair, lineHeight: 20 },
  waardeBlok: {
    backgroundColor: KLEUREN.kaart,
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  waardeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  waardeNaam: { fontSize: 17, fontWeight: '700', color: KLEUREN.tekstPrimair },
  gapBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  gapTekst: { fontSize: 12, fontWeight: '700' },
  sliderRij: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sliderLabel: { width: 54, fontSize: 12, color: KLEUREN.tekstSecundair, fontWeight: '500' },
  slider: { flex: 1 },
  sliderWaarde: { width: 28, fontSize: 13, fontWeight: '700', color: KLEUREN.tekstPrimair, textAlign: 'right' },
  knop: {
    backgroundColor: KLEUREN.primair,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  knopTekst: { color: KLEUREN.wit, fontSize: 17, fontWeight: '700' },
})
