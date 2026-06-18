import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnboardingStackParams } from '../../navigation'
import { KLEUREN } from '../../constants/kleuren'
import { vindSpanningen, WaardeNaam } from '../../lib/algoritme'

type Props = NativeStackScreenProps<OnboardingStackParams, 'ProfielReveal'>

const WAARDE_OMSCHRIJVING: Record<WaardeNaam, string> = {
  'Self-Direction': 'Eigen keuzes maken en authentiek zijn',
  'Stimulation': 'Avontuur, prikkeling en nieuwheid zoeken',
  'Hedonism': 'Genieten en plezier als drijfveer',
  'Achievement': 'Doelen bereiken en competentie tonen',
  'Power': 'Invloed uitoefenen en richting geven',
  'Security': 'Stabiliteit, veiligheid en voorspelbaarheid',
  'Conformity': 'Harmonie bewaren en verwachtingen volgen',
  'Tradition': 'Continuïteit, gewoonte en culturele wortels',
  'Benevolence': 'Zorg voor naasten en loyaliteit',
  'Universalism': 'Rechtvaardigheid, gelijkheid en een groter geheel',
}

export default function ProfielRevealScreen({ navigation, route }: Props) {
  const { antwoorden, resultaat } = route.params
  const top5 = resultaat.top5
  const spanningen = vindSpanningen(resultaat.berekendImportance)

  const [laden, setLaden] = useState(true)
  const [zichtbaar, setZichtbaar] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLaden(false)
      top5.forEach((_, i) => {
        setTimeout(() => setZichtbaar(i + 1), i * 400)
      })
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (laden) {
    return (
      <SafeAreaView style={[stijlen.container, stijlen.ladenContainer]}>
        <ActivityIndicator size="large" color={KLEUREN.accent} />
        <Text style={stijlen.ladenTekst}>Jouw patroon wordt zichtbaar…</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={stijlen.container}>
      <View style={stijlen.inhoud}>
        <View>
          <Text style={stijlen.label}>Op basis van jouw keuzes</Text>
          <Text style={stijlen.titel}>Dit drijft jou</Text>
        </View>

        <View style={stijlen.waardenLijst}>
          {top5.map((waarde, index) => (
            <View key={waarde} style={[stijlen.waardeRij, { opacity: zichtbaar > index ? 1 : 0 }]}>
              <View style={[stijlen.rang, { backgroundColor: KLEUREN.waardeKleuren[waarde] }]}>
                <Text style={stijlen.rangTekst}>{index + 1}</Text>
              </View>
              <View style={stijlen.waardeInfo}>
                <Text style={stijlen.waardeNaam}>{waarde}</Text>
                <Text style={stijlen.waardeOmschrijving}>{WAARDE_OMSCHRIJVING[waarde]}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Circumplex-spanning: tegengestelde waarden die beide hoog scoren */}
        {spanningen.length > 0 && zichtbaar >= top5.length && (
          <View style={stijlen.spanningKaart}>
            <Text style={stijlen.spanningLabel}>◆ Een spanning in jou</Text>
            <Text style={stijlen.spanningTekst}>
              {spanningen[0][0]} en {spanningen[0][1]} zijn allebei sterk aanwezig —
              waarden die vaak op gespannen voet staan. Daar valt iets te verkennen.
            </Text>
          </View>
        )}

        <View style={stijlen.onderaan}>
          <Text style={stijlen.hint}>
            Herken je dit? In de volgende stap zie je hoe sterk je ze leeft.
          </Text>
          <TouchableOpacity
            style={stijlen.knop}
            onPress={() => navigation.navigate('GapMeting', { antwoorden, resultaat })}
          >
            <Text style={stijlen.knopTekst}>Bekijk de gap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const stijlen = StyleSheet.create({
  container: { flex: 1, backgroundColor: KLEUREN.primair },
  ladenContainer: { alignItems: 'center', justifyContent: 'center', gap: 20 },
  ladenTekst: { color: 'rgba(255,255,255,0.6)', fontSize: 16 },
  inhoud: { flex: 1, padding: 28, justifyContent: 'space-between' },
  label: {
    fontSize: 12,
    color: KLEUREN.accent,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  titel: { fontSize: 36, fontWeight: '700', color: KLEUREN.wit, marginBottom: 8 },
  waardenLijst: { gap: 16, flex: 1, justifyContent: 'center' },
  waardeRij: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  rang: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  rangTekst: { color: KLEUREN.wit, fontWeight: '700', fontSize: 14 },
  waardeInfo: { flex: 1 },
  waardeNaam: { fontSize: 18, fontWeight: '700', color: KLEUREN.wit, marginBottom: 2 },
  waardeOmschrijving: { fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 18 },
  spanningKaart: {
    backgroundColor: 'rgba(233,69,96,0.12)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(233,69,96,0.35)',
    gap: 6,
  },
  spanningLabel: { fontSize: 12, fontWeight: '700', color: KLEUREN.accentZacht, letterSpacing: 0.5 },
  spanningTekst: { fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  onderaan: { gap: 16, marginTop: 16 },
  hint: { color: 'rgba(255,255,255,0.5)', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  knop: { backgroundColor: KLEUREN.accent, borderRadius: 14, paddingVertical: 18, alignItems: 'center' },
  knopTekst: { color: KLEUREN.wit, fontSize: 18, fontWeight: '700' },
})
