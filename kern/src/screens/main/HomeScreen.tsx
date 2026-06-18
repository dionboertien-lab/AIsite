import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParams } from '../../navigation'
import { KLEUREN, gapKleur } from '../../constants/kleuren'
import { GebruikersProfiel } from '../../lib/algoritme'
import { laadProfiel } from '../../lib/storage'

type Props = {
  navigation: BottomTabNavigationProp<MainTabParams, 'Home'>
}

const REFLECTIEVRAGEN = [
  'Wanneer leefde je deze waarde volledig — en wanneer liet je hem liggen?',
  'Wat maakte dat je gisteren dichter bij jezelf was — of verder weg?',
  'Welke keuze van deze week past het best bij wie jij wilt zijn?',
  'Wat zou je anders doen als je volledig vanuit je kern handelde?',
]

export default function HomeScreen({ navigation }: Props) {
  const [profiel, setProfiel] = useState<GebruikersProfiel | null>(null)

  useEffect(() => {
    laadProfiel().then(setProfiel)
  }, [])

  if (!profiel) {
    return (
      <SafeAreaView style={stijlen.container}>
        <View style={stijlen.laden}>
          <Text style={stijlen.ladenTekst}>Laden…</Text>
        </View>
      </SafeAreaView>
    )
  }

  const weekVraag = REFLECTIEVRAGEN[profiel.weekCount % REFLECTIEVRAGEN.length]
  const huidigeDag = new Date().toLocaleDateString('nl-NL', { weekday: 'long' })
  const isReflectieDag = huidigeDag === 'maandag' || huidigeDag === 'vrijdag'

  return (
    <SafeAreaView style={stijlen.container}>
      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={stijlen.header}>
          <Text style={stijlen.groet}>Kern</Text>
          <Text style={stijlen.subGroet}>Week {profiel.weekCount + 1} van je journey</Text>
        </View>

        {/* Weekse reflectiekaart */}
        <TouchableOpacity
          style={[stijlen.reflectieKaart, isReflectieDag && stijlen.reflectieKaartActief]}
          onPress={() => navigation.navigate('Reflectie')}
        >
          <View style={stijlen.reflectieKaartHeader}>
            <Text style={stijlen.reflectieLabel}>
              {isReflectieDag ? '● Nu — weekse reflectie' : '○ Weekse reflectie'}
            </Text>
            <Text style={stijlen.reflectiePijl}>→</Text>
          </View>
          <Text style={stijlen.reflectieVraag}>"{weekVraag}"</Text>
          <Text style={stijlen.reflectieWaarde}>
            Waarde deze week: {profiel.top5[profiel.weekCount % profiel.top5.length]}
          </Text>
        </TouchableOpacity>

        {/* Gap overzicht */}
        <Text style={stijlen.sectieKop}>Jouw waarden</Text>
        <View style={stijlen.waardenLijst}>
          {profiel.top5.map((waarde, i) => {
            const imp = profiel.baselineImportance[waarde] ?? 0
            const liv = profiel.baselineLived[waarde] ?? 0
            const gap = Math.max(0, imp - liv)

            return (
              <View key={waarde} style={stijlen.waardeRij}>
                <View style={stijlen.waardeLinker}>
                  <Text style={stijlen.waardeRang}>{i + 1}</Text>
                  <View>
                    <Text style={stijlen.waardeNaam}>{waarde}</Text>
                    <View style={stijlen.gapBalk}>
                      <View
                        style={[
                          stijlen.gapVulling,
                          { width: `${(liv / imp) * 100}%`, backgroundColor: gapKleur(gap) },
                        ]}
                      />
                    </View>
                  </View>
                </View>
                <View style={[stijlen.gapBadge, { borderColor: gapKleur(gap) }]}>
                  <Text style={[stijlen.gapCijfer, { color: gapKleur(gap) }]}>
                    {gap.toFixed(1)}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>

        <Text style={stijlen.gapUitleg}>Gap = verschil tussen belang en hoe sterk je het leeft</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const stijlen = StyleSheet.create({
  container: { flex: 1, backgroundColor: KLEUREN.achtergrond },
  laden: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ladenTekst: { color: KLEUREN.tekstSecundair },
  inhoud: { padding: 20, gap: 20, paddingBottom: 40 },
  header: { paddingTop: 8 },
  groet: { fontSize: 32, fontWeight: '800', color: KLEUREN.tekstPrimair },
  subGroet: { fontSize: 14, color: KLEUREN.tekstSecundair, marginTop: 2 },
  reflectieKaart: {
    backgroundColor: KLEUREN.kaart,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 10,
  },
  reflectieKaartActief: { borderColor: KLEUREN.accent, backgroundColor: '#FFF5F5' },
  reflectieKaartHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reflectieLabel: { fontSize: 12, fontWeight: '600', color: KLEUREN.accent },
  reflectiePijl: { fontSize: 18, color: KLEUREN.accent },
  reflectieVraag: {
    fontSize: 16,
    fontWeight: '600',
    color: KLEUREN.tekstPrimair,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  reflectieWaarde: { fontSize: 13, color: KLEUREN.tekstSecundair },
  sectieKop: { fontSize: 18, fontWeight: '700', color: KLEUREN.tekstPrimair },
  waardenLijst: { gap: 12 },
  waardeRij: {
    backgroundColor: KLEUREN.kaart,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waardeLinker: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  waardeRang: { fontSize: 20, fontWeight: '800', color: KLEUREN.kaartSchaduw, width: 24 },
  waardeNaam: { fontSize: 15, fontWeight: '700', color: KLEUREN.tekstPrimair, marginBottom: 6 },
  gapBalk: {
    height: 4,
    width: 140,
    backgroundColor: KLEUREN.kaartSchaduw,
    borderRadius: 2,
    overflow: 'hidden',
  },
  gapVulling: { height: 4, borderRadius: 2 },
  gapBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 48,
    alignItems: 'center',
  },
  gapCijfer: { fontSize: 13, fontWeight: '700' },
  gapUitleg: { fontSize: 12, color: KLEUREN.tekstLicht, textAlign: 'center' },
})
