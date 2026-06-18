import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { KLEUREN, gapKleur } from '../../constants/kleuren'
import { WaardeNaam } from '../../lib/algoritme'
import { useKern } from '../../store/KernContext'

const WAARDE_OMSCHRIJVING: Record<WaardeNaam, string> = {
  'Self-Direction': 'Eigen keuzes, vrijheid, authenticiteit',
  'Stimulation': 'Avontuur, prikkeling, nieuwheid',
  'Hedonism': 'Genieten, plezier, comfort',
  'Achievement': 'Doelen bereiken, competentie',
  'Power': 'Invloed, richting geven, status',
  'Security': 'Stabiliteit, veiligheid, orde',
  'Conformity': 'Harmonie, verwachtingen volgen',
  'Tradition': 'Continuïteit, gewoonte, wortels',
  'Benevolence': 'Zorg voor naasten, loyaliteit',
  'Universalism': 'Rechtvaardigheid, gelijkheid, groter geheel',
}

export default function ProfielScreen() {
  const { data, profiel } = useKern()
  const [uitgebreid, setUitgebreid] = useState<WaardeNaam | null>(null)

  if (!profiel || !data) {
    return (
      <SafeAreaView style={stijlen.container}>
        <View style={stijlen.laden}>
          <Text style={stijlen.ladenTekst}>Laden…</Text>
        </View>
      </SafeAreaView>
    )
  }

  const reflecties = data.reflecties.filter((r) => r.intakeId === profiel.id)
  const dagenActief = Math.floor((Date.now() - new Date(profiel.aangemaakt).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <SafeAreaView style={stijlen.container}>
      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        <View style={stijlen.header}>
          <Text style={stijlen.titel}>Jouw profiel</Text>
          <Text style={stijlen.subTitel}>{dagenActief} dagen actief · {reflecties.length} reflecties</Text>
        </View>

        <Text style={stijlen.sectieKop}>Jouw top 5 waarden</Text>
        <View style={stijlen.kaartLijst}>
          {profiel.top5.map((waarde) => {
            const imp = profiel.baselineImportance[waarde] ?? 0
            const liv = profiel.baselineLived[waarde] ?? 0
            const gap = Math.max(0, imp - liv)
            const isUitgebreid = uitgebreid === waarde
            const waardeReflecties = reflecties.filter((r) => r.waarde === waarde)

            return (
              <TouchableOpacity
                key={waarde}
                style={stijlen.waardeKaart}
                onPress={() => setUitgebreid(isUitgebreid ? null : waarde)}
              >
                <View style={stijlen.kaartHeader}>
                  <View style={stijlen.kaartLinks}>
                    <View style={[stijlen.kleurPunt, { backgroundColor: KLEUREN.waardeKleuren[waarde] }]} />
                    <View style={stijlen.kaartTitels}>
                      <Text style={stijlen.waardeNaam}>{waarde}</Text>
                      <Text style={stijlen.waardeOmschrijving}>{WAARDE_OMSCHRIJVING[waarde]}</Text>
                    </View>
                  </View>
                  <Text style={stijlen.uitbreidIcon}>{isUitgebreid ? '▲' : '▼'}</Text>
                </View>

                <View style={stijlen.gapVisueel}>
                  <View style={stijlen.gapRij}>
                    <Text style={stijlen.gapRijLabel}>Belang</Text>
                    <View style={stijlen.balkContainer}>
                      <View style={[stijlen.balk, { width: `${(imp / 10) * 100}%`, backgroundColor: KLEUREN.primair }]} />
                    </View>
                    <Text style={stijlen.gapRijCijfer}>{imp.toFixed(1)}</Text>
                  </View>
                  <View style={stijlen.gapRij}>
                    <Text style={stijlen.gapRijLabel}>Geleefd</Text>
                    <View style={stijlen.balkContainer}>
                      <View style={[stijlen.balk, { width: `${(liv / 10) * 100}%`, backgroundColor: gapKleur(gap) }]} />
                    </View>
                    <Text style={[stijlen.gapRijCijfer, { color: gapKleur(gap) }]}>{liv.toFixed(1)}</Text>
                  </View>
                </View>

                {isUitgebreid && (
                  <View style={stijlen.reflectieHistorie}>
                    <Text style={stijlen.reflectieHistorieTitel}>Reflecties</Text>
                    {waardeReflecties.slice(-3).reverse().map((r) => (
                      <View key={r.id} style={stijlen.reflectieItem}>
                        <Text style={stijlen.reflectieWeek}>Week {r.week + 1}</Text>
                        <Text style={stijlen.reflectieTekst} numberOfLines={3}>{r.tekst}</Text>
                        {r.commitmentTekst ? (
                          <Text style={stijlen.commitmentTekst}>
                            → {r.commitmentTekst}
                            {r.commitmentResultaat ? ` (${r.commitmentResultaat})` : ''}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                    {waardeReflecties.length === 0 && (
                      <Text style={stijlen.geenReflecties}>Nog geen reflecties voor deze waarde.</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={stijlen.voetTekst}>
          Gestart op {new Date(profiel.aangemaakt).toLocaleDateString('nl-NL', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </Text>
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
  titel: { fontSize: 30, fontWeight: '800', color: KLEUREN.tekstPrimair },
  subTitel: { fontSize: 13, color: KLEUREN.tekstSecundair, marginTop: 4 },
  sectieKop: { fontSize: 16, fontWeight: '700', color: KLEUREN.tekstPrimair },
  kaartLijst: { gap: 12 },
  waardeKaart: { backgroundColor: KLEUREN.kaart, borderRadius: 16, padding: 16, gap: 12 },
  kaartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  kaartLinks: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', flex: 1 },
  kleurPunt: { width: 12, height: 12, borderRadius: 6, marginTop: 4 },
  kaartTitels: { flex: 1 },
  waardeNaam: { fontSize: 16, fontWeight: '700', color: KLEUREN.tekstPrimair },
  waardeOmschrijving: { fontSize: 12, color: KLEUREN.tekstSecundair, marginTop: 2 },
  uitbreidIcon: { fontSize: 10, color: KLEUREN.tekstLicht },
  gapVisueel: { gap: 6 },
  gapRij: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gapRijLabel: { width: 50, fontSize: 11, color: KLEUREN.tekstSecundair },
  balkContainer: { flex: 1, height: 6, backgroundColor: KLEUREN.kaartSchaduw, borderRadius: 3, overflow: 'hidden' },
  balk: { height: 6, borderRadius: 3 },
  gapRijCijfer: { width: 28, fontSize: 12, fontWeight: '700', color: KLEUREN.tekstPrimair, textAlign: 'right' },
  reflectieHistorie: { borderTopWidth: 1, borderTopColor: KLEUREN.border, paddingTop: 12, gap: 10 },
  reflectieHistorieTitel: { fontSize: 12, fontWeight: '600', color: KLEUREN.tekstSecundair, textTransform: 'uppercase', letterSpacing: 1 },
  reflectieItem: { gap: 4 },
  reflectieWeek: { fontSize: 11, color: KLEUREN.tekstLicht },
  reflectieTekst: { fontSize: 13, color: KLEUREN.tekstPrimair, lineHeight: 19 },
  commitmentTekst: { fontSize: 12, color: KLEUREN.accent, fontStyle: 'italic' },
  geenReflecties: { fontSize: 13, color: KLEUREN.tekstLicht, fontStyle: 'italic' },
  voetTekst: { textAlign: 'center', fontSize: 12, color: KLEUREN.tekstLicht },
})
