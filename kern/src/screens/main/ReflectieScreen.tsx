import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native'
import { KLEUREN } from '../../constants/kleuren'
import { GebruikersProfiel, WaardeNaam, WekelijkseReflectie } from '../../lib/algoritme'
import { laadProfiel, slaReflectieOp, laadReflecties } from '../../lib/storage'

const MAANDAG_VRAGEN = [
  (w: WaardeNaam) => `Wanneer leefde je "${w}" de afgelopen week — en wanneer liet je het liggen?`,
  (w: WaardeNaam) => `Geef een concreet moment waarop "${w}" een rol speelde in jouw keuzes.`,
  (w: WaardeNaam) => `Wat maakte dat je "${w}" deze week meer of minder voelde?`,
]

const ACT_PROMPTS = [
  'Wat staat er tussen jou en deze waarde leven zoals je wilt?',
  'Als je volledig vanuit deze waarde handelde — wat zou je dan anders doen?',
  'Wat is één kleine stap die je deze week kunt zetten?',
]

type Dag = 'maandag' | 'vrijdag' | 'anders'

function huidigeReflectieDag(): Dag {
  const dag = new Date().toLocaleDateString('nl-NL', { weekday: 'long' })
  if (dag === 'maandag') return 'maandag'
  if (dag === 'vrijdag') return 'vrijdag'
  return 'anders'
}

export default function ReflectieScreen() {
  const [profiel, setProfiel] = useState<GebruikersProfiel | null>(null)
  const [huidigeReflectie, setHuidigeReflectie] = useState<WekelijkseReflectie | null>(null)
  const [tekst, setTekst] = useState('')
  const [commitment, setCommitment] = useState('')
  const [commitmentResultaat, setCommitmentResultaat] = useState<'Ja' | 'Deels' | 'Nee' | null>(null)
  const [opgeslagen, setOpgeslagen] = useState(false)
  const dag = huidigeReflectieDag()

  useEffect(() => {
    async function laad() {
      const p = await laadProfiel()
      setProfiel(p)
      if (p) {
        const reflecties = await laadReflecties()
        const dezeWeek = reflecties.find((r) => r.week === p.weekCount)
        setHuidigeReflectie(dezeWeek ?? null)
        if (dezeWeek?.commitmentTekst) setCommitment(dezeWeek.commitmentTekst)
      }
    }
    laad()
  }, [])

  async function slaOp() {
    if (!profiel || !tekst.trim()) return
    const waardeIndex = profiel.weekCount % profiel.top5.length
    const waarde = profiel.top5[waardeIndex]
    const reflectie: WekelijkseReflectie = {
      id: `${profiel.weekCount}-${dag}`,
      week: profiel.weekCount,
      waarde,
      uitgedrukt: true,
      tekst: tekst.trim(),
      commitmentTekst: commitment.trim(),
      commitmentResultaat: dag === 'vrijdag' ? commitmentResultaat ?? undefined : undefined,
      aangemaakt: new Date().toISOString(),
    }
    await slaReflectieOp(reflectie)
    setOpgeslagen(true)
  }

  if (!profiel) {
    return (
      <SafeAreaView style={stijlen.container}>
        <View style={stijlen.laden}>
          <Text style={stijlen.ladenTekst}>Laden…</Text>
        </View>
      </SafeAreaView>
    )
  }

  const waardeIndex = profiel.weekCount % profiel.top5.length
  const waarde = profiel.top5[waardeIndex]
  const vraag = MAANDAG_VRAGEN[profiel.weekCount % MAANDAG_VRAGEN.length](waarde)
  const actPrompt = ACT_PROMPTS[profiel.weekCount % ACT_PROMPTS.length]

  if (opgeslagen) {
    return (
      <SafeAreaView style={stijlen.container}>
        <View style={stijlen.bevestiging}>
          <Text style={stijlen.bevestigingIcon}>◉</Text>
          <Text style={stijlen.bevestigingTitel}>Opgeslagen</Text>
          <Text style={stijlen.bevestigingTekst}>
            Je reflectie is bewaard. Tot {dag === 'maandag' ? 'vrijdag' : 'volgende week'}.
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={stijlen.container}>
        <ScrollView contentContainerStyle={stijlen.inhoud} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={stijlen.header}>
            <Text style={stijlen.dag}>{dag === 'anders' ? 'Reflectie' : dag.charAt(0).toUpperCase() + dag.slice(1)}</Text>
            <View style={[stijlen.waardeBadge, { backgroundColor: KLEUREN.waardeKleuren[waarde] + '22' }]}>
              <Text style={[stijlen.waardeBadgeTekst, { color: KLEUREN.waardeKleuren[waarde] }]}>
                {waarde}
              </Text>
            </View>
          </View>

          {/* Vrijdag: eerst check-in op commitment */}
          {dag === 'vrijdag' && huidigeReflectie?.commitmentTekst && (
            <View style={stijlen.checkInBlok}>
              <Text style={stijlen.checkInLabel}>Jouw commitment van maandag</Text>
              <Text style={stijlen.checkInCommitment}>"{huidigeReflectie.commitmentTekst}"</Text>
              <Text style={stijlen.checkInVraag}>Lukte het?</Text>
              <View style={stijlen.resultaatKnoppen}>
                {(['Ja', 'Deels', 'Nee'] as const).map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[stijlen.resultaatKnop, commitmentResultaat === r && stijlen.resultaatGeselecteerd]}
                    onPress={() => setCommitmentResultaat(r)}
                  >
                    <Text style={[stijlen.resultaatTekst, commitmentResultaat === r && stijlen.resultaatTekstActief]}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Reflectievraag */}
          <View style={stijlen.vraagBlok}>
            <Text style={stijlen.vraagTekst}>{vraag}</Text>
          </View>

          <TextInput
            style={stijlen.invoer}
            placeholder="Schrijf hier vrij…"
            placeholderTextColor={KLEUREN.tekstLicht}
            multiline
            value={tekst}
            onChangeText={setTekst}
            textAlignVertical="top"
          />

          {/* ACT micro-commitment */}
          <View style={stijlen.actBlok}>
            <View style={stijlen.actHeader}>
              <Text style={stijlen.actLabel}>Commitment</Text>
            </View>
            <Text style={stijlen.actVraag}>{actPrompt}</Text>
            <TextInput
              style={stijlen.commitmentInvoer}
              placeholder="Één concrete stap deze week…"
              placeholderTextColor={KLEUREN.tekstLicht}
              value={commitment}
              onChangeText={setCommitment}
            />
          </View>

          <TouchableOpacity
            style={[stijlen.knop, !tekst.trim() && stijlen.knopUitgeschakeld]}
            onPress={slaOp}
            disabled={!tekst.trim()}
          >
            <Text style={stijlen.knopTekst}>Opslaan</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const stijlen = StyleSheet.create({
  container: { flex: 1, backgroundColor: KLEUREN.achtergrond },
  laden: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ladenTekst: { color: KLEUREN.tekstSecundair },
  inhoud: { padding: 20, gap: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 },
  dag: { fontSize: 28, fontWeight: '800', color: KLEUREN.tekstPrimair },
  waardeBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  waardeBadgeTekst: { fontSize: 13, fontWeight: '700' },
  checkInBlok: {
    backgroundColor: KLEUREN.kaart,
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  checkInLabel: { fontSize: 11, fontWeight: '600', color: KLEUREN.tekstSecundair, textTransform: 'uppercase', letterSpacing: 1 },
  checkInCommitment: { fontSize: 15, fontStyle: 'italic', color: KLEUREN.tekstPrimair, lineHeight: 22 },
  checkInVraag: { fontSize: 15, fontWeight: '600', color: KLEUREN.tekstPrimair },
  resultaatKnoppen: { flexDirection: 'row', gap: 10 },
  resultaatKnop: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: KLEUREN.border,
    alignItems: 'center',
  },
  resultaatGeselecteerd: { borderColor: KLEUREN.accent, backgroundColor: '#FFF5F5' },
  resultaatTekst: { fontSize: 14, fontWeight: '600', color: KLEUREN.tekstSecundair },
  resultaatTekstActief: { color: KLEUREN.accent },
  vraagBlok: { gap: 4 },
  vraagTekst: { fontSize: 18, fontWeight: '700', color: KLEUREN.tekstPrimair, lineHeight: 26 },
  invoer: {
    backgroundColor: KLEUREN.kaart,
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: KLEUREN.tekstPrimair,
    minHeight: 120,
    lineHeight: 22,
  },
  actBlok: { backgroundColor: KLEUREN.kaart, borderRadius: 14, padding: 16, gap: 10 },
  actHeader: { flexDirection: 'row', alignItems: 'center' },
  actLabel: { fontSize: 12, fontWeight: '700', color: KLEUREN.accent, textTransform: 'uppercase', letterSpacing: 1 },
  actVraag: { fontSize: 14, color: KLEUREN.tekstPrimair, lineHeight: 20 },
  commitmentInvoer: {
    borderTopWidth: 1,
    borderTopColor: KLEUREN.border,
    paddingTop: 12,
    fontSize: 14,
    color: KLEUREN.tekstPrimair,
  },
  knop: {
    backgroundColor: KLEUREN.primair,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  knopUitgeschakeld: { opacity: 0.35 },
  knopTekst: { color: KLEUREN.wit, fontSize: 16, fontWeight: '700' },
  bevestiging: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 },
  bevestigingIcon: { fontSize: 48, color: KLEUREN.accent },
  bevestigingTitel: { fontSize: 26, fontWeight: '800', color: KLEUREN.tekstPrimair },
  bevestigingTekst: { fontSize: 15, color: KLEUREN.tekstSecundair, textAlign: 'center', lineHeight: 22 },
})
