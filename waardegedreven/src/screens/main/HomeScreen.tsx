import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParams } from '../../navigation'
import { KLEUREN, gapKleur } from '../../constants/kleuren'
import { useKern } from '../../store/KernContext'
import { isReflectieDag } from '../../lib/datum'

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
  const { profiel } = useKern()

  if (!profiel) {
    return (
      <SafeAreaView style={stijlen.container}>
        <View style={stijlen.laden}>
          <Text style={stijlen.ladenTekst}>Laden…</Text>
        </View>
      </SafeAreaView>
    )
  }

  const weekVraag = REFLECTIEVRAGEN[profiel.weekIndex % REFLECTIEVRAGEN.length]
  const weekWaarde = profiel.top5[profiel.weekIndex % profiel.top5.length]
  const reflectieVandaag = isReflectieDag()

  return (
    <SafeAreaView style={stijlen.container}>
      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        <View style={stijlen.header}>
          <Text style={stijlen.groet}>Waardegedreven</Text>
          <Text style={stijlen.subGroet}>Week {profiel.weekIndex + 1} van je journey</Text>
        </View>

        <TouchableOpacity
          style={[stijlen.reflectieKaart, reflectieVandaag && stijlen.reflectieKaartActief]}
          onPress={() => navigation.navigate('Reflectie')}
        >
          <View style={stijlen.reflectieKaartHeader}>
            <Text style={stijlen.reflectieLabel}>
              {reflectieVandaag ? '● Nu — weekse reflectie' : '○ Weekse reflectie'}
            </Text>
            <Text style={stijlen.reflectiePijl}>→</Text>
          </View>
          <Text style={stijlen.reflectieVraag}>"{weekVraag}"</Text>
          <Text style={stijlen.reflectieWaarde}>Waarde deze week: {weekWaarde}</Text>
        </TouchableOpacity>

        <Text style={stijlen.sectieKop}>Jouw waarden</Text>
        <View style={stijlen.waardenLijst}>
          {profiel.top5.map((waarde, i) => {
            const imp = profiel.baselineImportance[waarde] ?? 0
            const liv = profiel.baselineLived[waarde] ?? 0
            const gap = Math.max(0, imp - liv)
            const vulPercentage = imp > 0 ? Math.min(100, (liv / imp) * 100) : 0

            return (
              <View key={waarde} style={stijlen.waardeRij}>
                <View style={stijlen.waardeLinker}>
                  <Text style={stijlen.waardeRang}>{i + 1}</Text>
                  <View style={stijlen.waardeMidden}>
                    <Text style={stijlen.waardeNaam}>{waarde}</Text>
                    <View style={stijlen.gapBalk}>
                      <View
                        style={[stijlen.gapVulling, { width: `${vulPercentage}%`, backgroundColor: gapKleur(gap) }]}
                      />
                    </View>
                  </View>
                </View>
                <View style={[stijlen.gapBadge, { borderColor: gapKleur(gap) }]}>
                  <Text style={[stijlen.gapCijfer, { color: gapKleur(gap) }]}>{gap.toFixed(1)}</Text>
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
  reflectieVraag: { fontSize: 16, fontWeight: '600', color: KLEUREN.tekstPrimair, lineHeight: 22, fontStyle: 'italic' },
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
  waardeMidden: { flex: 1 },
  waardeNaam: { fontSize: 15, fontWeight: '700', color: KLEUREN.tekstPrimair, marginBottom: 6 },
  gapBalk: { height: 4, backgroundColor: KLEUREN.kaartSchaduw, borderRadius: 2, overflow: 'hidden' },
  gapVulling: { height: 4, borderRadius: 2 },
  gapBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 48,
    alignItems: 'center',
    marginLeft: 12,
  },
  gapCijfer: { fontSize: 13, fontWeight: '700' },
  gapUitleg: { fontSize: 12, color: KLEUREN.tekstLicht, textAlign: 'center' },
})
