import React, { useState, useMemo } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OnboardingStackParams } from '../../navigation'
import { KLEUREN } from '../../constants/kleuren'
import { VRAGEN, Optie } from '../../constants/vragen'
import { AntwoordOptie, VraagAntwoord, berekenProfiel } from '../../lib/algoritme'

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParams, 'GedragsIntake'>
}

type VraagStap = 'voorkeur' | 'gedrag'

// Roteert de opties zodat de gedrag-stap niet in dezelfde volgorde staat als
// de voorkeur-stap — vermindert positie-anchoring (de neiging om simpelweg
// het eerste antwoord te herhalen). De id's blijven gekoppeld aan hun gewicht.
function roteer(opties: Optie[], stappen: number): Optie[] {
  const n = opties.length
  const offset = ((stappen % n) + n) % n
  return [...opties.slice(offset), ...opties.slice(0, offset)]
}

export default function GedragsIntakeScreen({ navigation }: Props) {
  const [vraagIndex, setVraagIndex] = useState(0)
  const [stap, setStap] = useState<VraagStap>('voorkeur')
  const [antwoorden, setAntwoorden] = useState<VraagAntwoord[]>([])
  const [geselecteerdVoorkeur, setGeselecteerdVoorkeur] = useState<AntwoordOptie | null>(null)
  const [geselecteerdGedrag, setGeselecteerdGedrag] = useState<AntwoordOptie | null>(null)

  const huidigeVraag = VRAGEN[vraagIndex]
  const totaalStappen = VRAGEN.length * 2
  const huidigeStap = vraagIndex * 2 + (stap === 'gedrag' ? 1 : 0)
  const voortgang = (huidigeStap + 1) / totaalStappen

  const getoondeOpties = useMemo(
    () => (stap === 'gedrag' ? roteer(huidigeVraag.opties, huidigeVraag.nummer) : huidigeVraag.opties),
    [stap, huidigeVraag]
  )

  function volgendeVraagOfKlaar(gedragsOptie: AntwoordOptie) {
    const nieuwAntwoord: VraagAntwoord = {
      vraagNummer: huidigeVraag.nummer,
      voorkeursOptie: geselecteerdVoorkeur!,
      gedragsOptie,
    }
    const bijgewerkt = [...antwoorden, nieuwAntwoord]

    if (vraagIndex < VRAGEN.length - 1) {
      setAntwoorden(bijgewerkt)
      setVraagIndex(vraagIndex + 1)
      setStap('voorkeur')
      setGeselecteerdVoorkeur(null)
      setGeselecteerdGedrag(null)
    } else {
      const resultaat = berekenProfiel(bijgewerkt)
      navigation.navigate('ProfielReveal', { antwoorden: bijgewerkt, resultaat })
    }
  }

  function bevestig() {
    if (stap === 'voorkeur' && geselecteerdVoorkeur) {
      setStap('gedrag')
    } else if (stap === 'gedrag' && geselecteerdGedrag) {
      volgendeVraagOfKlaar(geselecteerdGedrag)
    }
  }

  const geselecteerd = stap === 'voorkeur' ? geselecteerdVoorkeur : geselecteerdGedrag
  const knopTekst = stap === 'voorkeur' ? 'En wat deed je echt?' : 'Volgende'

  return (
    <SafeAreaView style={stijlen.container}>
      <View style={stijlen.voortgangContainer}>
        <View style={stijlen.voortgangBalk}>
          <View style={[stijlen.voortgangVulling, { width: `${voortgang * 100}%` }]} />
        </View>
        <Text style={stijlen.voortgangTekst}>{huidigeStap + 1} / {totaalStappen}</Text>
      </View>

      <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
        <Text style={stijlen.vraagNummer}>Vraag {huidigeVraag.nummer}</Text>
        <Text style={stijlen.situatie}>{huidigeVraag.tekst}</Text>

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

        <View style={stijlen.optiesContainer}>
          {getoondeOpties.map((optie: Optie) => {
            const isGeselecteerd = geselecteerd === optie.id
            return (
              <TouchableOpacity
                key={optie.id}
                style={[stijlen.optie, isGeselecteerd && stijlen.optieGeselecteerd]}
                onPress={() =>
                  stap === 'voorkeur'
                    ? setGeselecteerdVoorkeur(optie.id)
                    : setGeselecteerdGedrag(optie.id)
                }
              >
                <View style={[stijlen.optieLabel, isGeselecteerd && stijlen.optieLabelGeselecteerd]}>
                  <View style={[stijlen.optieStip, isGeselecteerd && stijlen.optieStipActief]} />
                </View>
                <Text style={[stijlen.optieTekst, isGeselecteerd && stijlen.optieTekstGeselecteerd]}>
                  {optie.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      <View style={stijlen.knopContainer}>
        <TouchableOpacity
          style={[stijlen.knop, !geselecteerd && stijlen.knopUitgeschakeld]}
          onPress={bevestig}
          disabled={!geselecteerd}
        >
          <Text style={stijlen.knopTekst}>{knopTekst}</Text>
        </TouchableOpacity>
      </View>
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
  voortgangBalk: { flex: 1, height: 4, backgroundColor: KLEUREN.kaartSchaduw, borderRadius: 2 },
  voortgangVulling: { height: 4, backgroundColor: KLEUREN.accent, borderRadius: 2 },
  voortgangTekst: { fontSize: 12, color: KLEUREN.tekstSecundair },
  inhoud: { padding: 24, paddingBottom: 40 },
  vraagNummer: {
    fontSize: 12,
    fontWeight: '600',
    color: KLEUREN.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  situatie: { fontSize: 22, fontWeight: '700', color: KLEUREN.tekstPrimair, lineHeight: 30, marginBottom: 20 },
  promptContainer: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  promptIndicator: { width: 3, height: 20, backgroundColor: KLEUREN.accent, borderRadius: 2, marginTop: 2 },
  prompt: { flex: 1, fontSize: 17, fontWeight: '600', color: KLEUREN.tekstPrimair, lineHeight: 24 },
  gedragsHint: { fontSize: 13, color: KLEUREN.tekstSecundair, fontStyle: 'italic', marginBottom: 20 },
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
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: KLEUREN.kaartSchaduw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optieLabelGeselecteerd: { borderColor: KLEUREN.accent },
  optieStip: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'transparent' },
  optieStipActief: { backgroundColor: KLEUREN.accent },
  optieTekst: { flex: 1, fontSize: 15, color: KLEUREN.tekstPrimair, lineHeight: 21 },
  optieTekstGeselecteerd: { fontWeight: '600' },
  knopContainer: { padding: 20, backgroundColor: KLEUREN.achtergrond },
  knop: { backgroundColor: KLEUREN.primair, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  knopUitgeschakeld: { opacity: 0.35 },
  knopTekst: { color: KLEUREN.wit, fontSize: 16, fontWeight: '700' },
})
