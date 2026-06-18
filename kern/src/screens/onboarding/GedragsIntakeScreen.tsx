import React, { useState } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OnboardingStackParams } from '../../navigation'
import { KLEUREN } from '../../constants/kleuren'
import { VRAGEN, Optie } from '../../constants/vragen'
import { AntwoordOptie, VraagAntwoord } from '../../lib/algoritme'

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'GedragsIntake'>
}

type VraagStap = 'voorkeur' | 'gedrag'

export default function GedragsIntakeScreen({ navigation }: Props) {
  const [vraagIndex, setVraagIndex] = useState(0)
  const [stap, setStap] = useState<VraagStap>('voorkeur')
  const [antwoorden, setAntwoorden] = useState<VraagAntwoord[]>([])
  const [geselecteerdVoorkeur, setGeselecteerdVoorkeur] = useState<AntwoordOptie | null>(null)

  const huidigeVraag = VRAGEN[vraagIndex]
  const totaalStappen = VRAGEN.length * 2
  const huidigeStap = vraagIndex * 2 + (stap === 'gedrag' ? 1 : 0)
  const voortgang = huidigeStap / totaalStappen

  function selecteerOptie(optie: AntwoordOptie) {
    if (stap === 'voorkeur') {
      setGeselecteerdVoorkeur(optie)
    } else {
      // Tweede stap: sla beide antwoorden op
      const nieuwAntwoord: VraagAntwoord = {
        vraagNummer: huidigeVraag.nummer,
        voorkeursOptie: geselecteerdVoorkeur!,
        gedragsOptie: optie,
      }
      const bijgewerkt = [...antwoorden, nieuwAntwoord]
      setAntwoorden(bijgewerkt)

      if (vraagIndex < VRAGEN.length - 1) {
        setVraagIndex(vraagIndex + 1)
        setStap('voorkeur')
        setGeselecteerdVoorkeur(null)
      } else {
        // Klaar — navigeer naar reveal met antwoorden
        navigation.navigate('ProfielReveal', { antwoorden: bijgewerkt } as never)
      }
    }
  }

  function gaVervolgStap() {
    if (stap === 'voorkeur' && geselecteerdVoorkeur) {
      setStap('gedrag')
    }
  }

  return (
    <SafeAreaView style={stijlen.container}>
      {/* Voortgangsbalk */}
      <View style={stijlen.voortgangContainer}>
        <View style={stijlen.voortgangBalk}>
          <View style={[stijlen.voortgangVulling, { width: `${voortgang * 100}%` }]} />
        </View>
        <Text style={stijlen.voortgangTekst}>{huidigeStap + 1} / {totaalStappen}</Text>
      </View>

      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        {/* Vraagnummer */}
        <Text style={stijlen.vraagNummer}>Vraag {huidigeVraag.nummer}</Text>

        {/* Situatie */}
        <Text style={stijlen.situatie}>{huidigeVraag.tekst}</Text>

        {/* Prompt */}
        <View style={stijlen.promptContainer}>
          <View style={stijlen.promptIndicator} />
          <Text style={stijlen.prompt}>
            {stap === 'voorkeur' ? huidigeVraag.voorkeursPrompt : huidigeVraag.gedragsPrompt}
          </Text>
        </View>

        {stap === 'gedrag' && (
          <Text style={stijlen.gedragsHint}>
            Wees eerlijk — ook als het verschilt van je vorige antwoord.
          </Text>
        )}

        {/* Opties */}
        <View style={stijlen.optiesContainer}>
          {huidigeVraag.opties.map((optie: Optie) => {
            const geselecteerd =
              stap === 'voorkeur'
                ? geselecteerdVoorkeur === optie.id
                : false

            return (
              <TouchableOpacity
                key={optie.id}
                style={[stijlen.optie, geselecteerd && stijlen.optieGeselecteerd]}
                onPress={() => {
                  if (stap === 'voorkeur') {
                    setGeselecteerdVoorkeur(optie.id)
                  } else {
                    selecteerOptie(optie.id)
                  }
                }}
              >
                <View style={[stijlen.optieLabel, geselecteerd && stijlen.optieLabelGeselecteerd]}>
                  <Text style={[stijlen.optieLabelTekst, geselecteerd && { color: KLEUREN.wit }]}>
                    {optie.id}
                  </Text>
                </View>
                <Text style={[stijlen.optieTekst, geselecteerd && stijlen.optieTekstGeselecteerd]}>
                  {optie.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      {/* Doorgaan knop (alleen bij voorkeur-stap) */}
      {stap === 'voorkeur' && (
        <View style={stijlen.knopContainer}>
          <TouchableOpacity
            style={[stijlen.knop, !geselecteerdVoorkeur && stijlen.knopUitgeschakeld]}
            onPress={gaVervolgStap}
            disabled={!geselecteerdVoorkeur}
          >
            <Text style={stijlen.knopTekst}>En wat deed je echt?</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const stijlen = StyleSheet.create({
  container: { flex: 1, backgroundColor: KLEUREN.achtergrond },
  voortgangContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  voortgangBalk: {
    flex: 1,
    height: 4,
    backgroundColor: KLEUREN.kaartSchaduw,
    borderRadius: 2,
  },
  voortgangVulling: {
    height: 4,
    backgroundColor: KLEUREN.accent,
    borderRadius: 2,
  },
  voortgangTekst: { fontSize: 12, color: KLEUREN.tekstSecundair },
  inhoud: { padding: 24, paddingBottom: 100 },
  vraagNummer: {
    fontSize: 12,
    fontWeight: '600',
    color: KLEUREN.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  situatie: {
    fontSize: 22,
    fontWeight: '700',
    color: KLEUREN.tekstPrimair,
    lineHeight: 30,
    marginBottom: 20,
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  promptIndicator: {
    width: 3,
    height: 20,
    backgroundColor: KLEUREN.accent,
    borderRadius: 2,
    marginTop: 2,
  },
  prompt: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: KLEUREN.tekstPrimair,
    lineHeight: 24,
  },
  gedragsHint: {
    fontSize: 13,
    color: KLEUREN.tekstSecundair,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  optiesContainer: { gap: 10, marginTop: 16 },
  optie: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KLEUREN.kaart,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 14,
  },
  optieGeselecteerd: { borderColor: KLEUREN.accent, backgroundColor: '#FFF5F5' },
  optieLabel: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: KLEUREN.kaartSchaduw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optieLabelGeselecteerd: { backgroundColor: KLEUREN.accent },
  optieLabelTekst: { fontSize: 12, fontWeight: '700', color: KLEUREN.tekstSecundair },
  optieTekst: { flex: 1, fontSize: 15, color: KLEUREN.tekstPrimair, lineHeight: 21 },
  optieTekstGeselecteerd: { fontWeight: '600' },
  knopContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: KLEUREN.achtergrond,
  },
  knop: {
    backgroundColor: KLEUREN.primair,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  knopUitgeschakeld: { opacity: 0.35 },
  knopTekst: { color: KLEUREN.wit, fontSize: 16, fontWeight: '700' },
})
