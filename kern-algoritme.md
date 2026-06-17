# Kern — Het Algoritme

> Hoe worden 6 gedragsantwoorden een Schwartz-waardenprofiel met Values Bridge gap?

---

## Overzicht

Het algoritme bestaat uit vier stappen:

```
Stap 1 — INPUT       6 gedragsscenario's (voorkeur + werkelijk gedrag)
Stap 2 — SCORING     Antwoorden worden gemapt op Schwartz-gewichten
Stap 3 — PROFIEL     Normalisatie → top 5 waarden
Stap 4 — GAP         Voorkeur vs. gedrag → Values Bridge startpunt
```

Het slimme zit in stap 4: omdat we per vraag BEIDE ankers uitvragen (wat wil je / wat deed je echt), kunnen we de Values Bridge gap al uit de intake destilleren — niet als aparte vraag achteraf.

---

## Theoretisch fundament

### De 10 Schwartz Basiswaarden

Gegroepeerd op de twee assen van het circumplex:

```
                    Zelf-transcendentie
                    (Universalism, Benevolence)
                           ↑
Openheid ←────────────────────────────────→ Conservatisme
(Self-Direction,                            (Security,
 Stimulation)                               Conformity,
                           ↓                Tradition)
                    Zelf-versterking
                    (Achievement, Power, Hedonism)
```

| # | Waarde | Kern motivatie |
|---|---|---|
| 1 | Self-Direction | Eigen denken, keuzes, vrijheid |
| 2 | Stimulation | Prikkeling, avontuur, nieuwheid |
| 3 | Hedonism | Plezier, genieten, comfort |
| 4 | Achievement | Succes, competentie, presteren |
| 5 | Power | Status, controle, invloed |
| 6 | Security | Veiligheid, stabiliteit, orde |
| 7 | Conformity | Regels volgen, harmonie bewaren |
| 8 | Tradition | Gewoonte, cultuur, continuïteit |
| 9 | Benevolence | Zorg voor naasten, loyaliteit |
| 10 | Universalism | Rechtvaardigheid, gelijkheid, natuur |

---

## De 6 Gedragsvragen

Elk vraag heeft twee ankers:
- **Voorkeur** → wat de persoon wil (belang-signaal)
- **Gedrag** → wat de persoon deed (geleefd-signaal)

Het verschil tussen de twee is het ruwe Values Bridge gap-signaal.

Elke vraag dekt 2-4 van de 10 waarden. Samen dekken de 6 vragen het volledige Schwartz-circumplex.

---

### Vraag 1 — Energie & vrije tijd
*Dekt: Stimulation, Hedonism, Achievement, Benevolence, Security*

> **"Je hebt een onverwachte vrije dag. Wat trekt je het meest — en wat deed je de vorige keer dat dit echt zo was?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Iets nieuws ontdekken, een avontuur in | Stimulation +3, Self-Direction +2 |
| B | Bijkomen, genieten, niks moeten | Hedonism +3, Security +1 |
| C | Iets nuttigs doen, verder komen | Achievement +3, Self-Direction +1 |
| D | Tijd met mensen die ik lief heb | Benevolence +3, Security +1 |

---

### Vraag 2 — Beslissingen onder druk
*Dekt: Self-Direction, Benevolence, Universalism, Conformity, Achievement, Power*

> **"Je staat voor een keuze die anderen van je verwachten, maar die jij anders ziet. Wat doe je — en wat deed je de laatste keer dat dit speelde?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Ik doe wat ik zelf het juiste vind, ook als dat schuring geeft | Self-Direction +3, Stimulation +1 |
| B | Ik zoek wat voor iedereen werkt | Benevolence +2, Universalism +2 |
| C | Ik volg wat er van mij verwacht wordt | Conformity +3, Security +1 |
| D | Ik overtuig anderen van mijn gelijk | Achievement +2, Power +2 |

---

### Vraag 3 — Succes & trots
*Dekt: Achievement, Benevolence, Universalism, Power, Stimulation, Self-Direction*

> **"Beschrijf een moment van de afgelopen weken waar je trots op was. Wat maakte het waardevol voor jou?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Ik heb iets voor elkaar gekregen dat moeilijk was | Achievement +3, Self-Direction +1 |
| B | Ik heb iemand geholpen of iets bijgedragen | Benevolence +3, Universalism +1 |
| C | Ik werd erkend of gewaardeerd door anderen | Power +2, Achievement +2 |
| D | Ik heb iets gemaakt of ontdekt dat nieuw was | Stimulation +2, Self-Direction +2 |

---

### Vraag 4 — Conflict & oneerlijkheid
*Dekt: Universalism, Self-Direction, Conformity, Benevolence, Security, Power*

> **"Er is frictie of oneerlijkheid in jouw omgeving. Hoe reageer jij — en wat deed je de laatste keer?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Ik spreek me uit, ook als dat oncomfortabel is | Universalism +3, Self-Direction +1 |
| B | Ik probeer de harmonie te bewaren | Conformity +2, Benevolence +2 |
| C | Ik trek me er zo veel mogelijk uit terug | Security +3, Conformity +1 |
| D | Ik pak het direct aan en los het op | Achievement +2, Power +2 |

---

### Vraag 5 — Verandering & zekerheid
*Dekt: Stimulation, Self-Direction, Security, Tradition, Conformity, Power*

> **"Er komt een grote verandering op je af — nieuw werk, nieuwe plek, nieuw begin. Hoe reageer je — en hoe reageerde je de vorige keer?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Ik zie het als kans — verandering geeft mij energie | Stimulation +3, Self-Direction +2 |
| B | Ik ben voorzichtig, ik wil weten waar ik aan toe ben | Security +3, Tradition +1 |
| C | Ik pas me aan als het moet, maar hou vast aan wat werkt | Tradition +2, Conformity +2 |
| D | Ik stuur het liever zelf — ik wil controle over de richting | Self-Direction +2, Power +2 |

---

### Vraag 6 — Wanneer voel je je het meest jezelf
*Dekt: Self-Direction, Achievement, Benevolence, Security, Universalism, Hedonism*

> **"Beschrijf een recent moment waarop je je volledig op je plek voelde. Wat was er aan de hand?"**

| Optie | Tekst | Gewichten |
|---|---|---|
| A | Ik was bezig met iets dat ik zelf had gekozen en volledig in geloof | Self-Direction +3, Achievement +1 |
| B | Ik was samen met mensen die er voor me doen | Benevolence +3, Security +1 |
| C | Ik was bezig met iets dat verder gaat dan mezelf | Universalism +3, Benevolence +1 |
| D | Ik genoot volledig, zonder verplichtingen | Hedonism +3, Self-Direction +1 |

---

## Scoringslogica

### Stap 1 — Ruwe scores berekenen

Per vraag registreert het systeem:
- `voorkeur_optie` — wat de gebruiker het liefst doet
- `gedrag_optie` — wat de gebruiker de vorige keer écht deed

```
raw_importance = {}   // op basis van voorkeur_optie
raw_lived = {}        // op basis van gedrag_optie

for vraag in [1..6]:
    voor elke (waarde, gewicht) in MATRIX[vraag][voorkeur_optie]:
        raw_importance[waarde] += gewicht

    voor elke (waarde, gewicht) in MATRIX[vraag][gedrag_optie]:
        raw_lived[waarde] += gewicht
```

### Stap 2 — Normalisatie

Normaliseer relatief aan de hoogst scorende waarde, zodat de topwaarde altijd op 10 uitkomt en andere waarden proportioneel zijn:

```
max_importance = max(raw_importance.values())
max_lived      = max(raw_lived.values())

importance[waarde] = (raw_importance[waarde] / max_importance) * 10
lived[waarde]      = (raw_lived[waarde] / max_lived) * 10
```

### Stap 3 — Top 5 selecteren

```
top_5 = sorted(importance, key=importance[waarde], descending=true)[:5]
```

### Stap 4 — Values Bridge gap berekenen

```
for waarde in top_5:
    gap[waarde] = importance[waarde] - lived[waarde]
```

Een positieve gap betekent: je vindt het belangrijk maar leeft het onvoldoende.
Een negatieve gap betekent: je leeft iets sterker dan je het bewust waardeert (zeldzaam maar informatief).

---

## Values Bridge — Sliiderverfijning

Na de automatische berekening toont de app sliders zodat de gebruiker kan bevestigen of bijstellen:

```
[Waarde: Autonomie]

Hoe belangrijk?    [────────●─] 8.2  ← vooringevuld vanuit voorkeur-antwoorden
Hoe leef je het?   [────●─────] 4.1  ← vooringevuld vanuit gedrag-antwoorden

Gap: 4.1 punten
```

De gebruiker beweegt de sliders als ze niet kloppen. De uiteindelijke waarden na bevestiging worden opgeslagen als `baseline_importance` en `baseline_lived`.

**Waarom dit werkt:**
De pre-berekende waarden fungeren als informed defaults — ze zijn niet willekeurig maar gebaseerd op gedrag. Dat verankert de slider-sessie psychologisch: de gebruiker verfijnt een spiegel in plaats van alles zelf te verzinnen.

---

## Weekse Reflectie — Profielupdate

Elke maandag stelt de app één reflectievraag over één van de top-5 waarden (roterend schema). De gebruiker beschrijft een gedragsmoment.

Het algoritme slaat drie signalen op:

```
reflectie = {
    waarde: "Self-Direction",
    uitgedrukt: true/false,    // leefde je het?
    geblokkeerd_door: tekst,   // optioneel: wat stond ertussen?
    vrijdag_check: "Ja/Deels/Nee"  // commitment follow-up
}
```

Na 4 weken wordt een gewogen gemiddelde berekend:

```
lived_updated[waarde] = (
    baseline_lived[waarde] * 0.6 +
    gemiddelde_reflectie_score[waarde] * 0.4
)
```

De initiële intake telt zwaarder (0.6) dan de weekse signalen (0.4), maar over tijd schuift de verhouding:

```
// Na 12 weken:
lived_updated = baseline * 0.3 + reflecties_gemiddelde * 0.7
```

Het profiel wordt dus nauwkeuriger naarmate de gebruiker langer actief is.

---

## LLM Integratie (Claude API)

Voor open tekstinvoer (als alternatief voor de 4 opties) classifieert een LLM de respons:

### Systeem-prompt

```
Je bent een expert in de Schwartz Theory of Basic Values.
De 10 waarden zijn:
Self-Direction, Stimulation, Hedonism, Achievement, Power,
Security, Conformity, Tradition, Benevolence, Universalism.

Gegeven een beschrijving van menselijk gedrag, geef elk een score van 0-3:
- 0 = niet aanwezig in dit antwoord
- 1 = zwak signaal
- 2 = duidelijk signaal  
- 3 = dominant signaal

Geef ALLEEN een JSON object terug. Geen tekst.
```

### User-prompt (per antwoord)

```
Vraagcontext: [vraagtekst]
Gebruikersantwoord: [open tekst]

Geef de waarden-scores als JSON.
```

### Verwacht antwoord

```json
{
  "Self-Direction": 3,
  "Stimulation": 1,
  "Hedonism": 0,
  "Achievement": 2,
  "Power": 0,
  "Security": 1,
  "Conformity": 0,
  "Tradition": 0,
  "Benevolence": 1,
  "Universalism": 0
}
```

Deze scores worden direct gebruikt in de scoringslogica als vervanging voor de optie-gewichten.

**Model:** `claude-haiku-4-5-20251001` — snel en goedkoop voor classificatietaken.
**Kosten:** ~$0.001 per classificatie (6 vragen × 3 tokens output per waarde = minimaal).

---

## Weighting Matrix (volledig overzicht)

```
         SD  ST  HE  AC  PO  SE  CO  TR  BE  UN
Q1-A:     2   3   0   0   0   0   0   0   0   0
Q1-B:     0   0   3   0   0   1   0   0   0   0
Q1-C:     1   0   0   3   0   0   0   0   0   0
Q1-D:     0   0   0   0   0   1   0   0   3   0

Q2-A:     3   1   0   0   0   0   0   0   0   0
Q2-B:     0   0   0   0   0   0   0   0   2   2
Q2-C:     0   0   0   0   0   1   3   0   0   0
Q2-D:     0   0   0   2   2   0   0   0   0   0

Q3-A:     1   0   0   3   0   0   0   0   0   0
Q3-B:     0   0   0   0   0   0   0   0   3   1
Q3-C:     0   0   0   2   2   0   0   0   0   0
Q3-D:     2   2   0   0   0   0   0   0   0   0

Q4-A:     1   0   0   0   0   0   0   0   0   3
Q4-B:     0   0   0   0   0   0   2   0   2   0
Q4-C:     0   0   0   0   0   3   1   0   0   0
Q4-D:     0   0   0   2   2   0   0   0   0   0

Q5-A:     2   3   0   0   0   0   0   0   0   0
Q5-B:     0   0   0   0   0   3   0   1   0   0
Q5-C:     0   0   0   0   0   0   2   2   0   0
Q5-D:     2   0   0   0   2   0   0   0   0   0

Q6-A:     3   0   0   1   0   0   0   0   0   0
Q6-B:     0   0   0   0   0   1   0   0   3   0
Q6-C:     0   0   0   0   0   0   0   0   1   3
Q6-D:     1   0   3   0   0   0   0   0   0   0

Legenda: SD=Self-Direction, ST=Stimulation, HE=Hedonism, AC=Achievement,
         PO=Power, SE=Security, CO=Conformity, TR=Tradition,
         BE=Benevolence, UN=Universalism
```

---

## Maximale bereikbare scores per waarde

Op basis van de matrix (alle 6 vragen, meest extreme optie per waarde):

| Waarde | Max score | Vragen die bijdragen |
|---|---|---|
| Self-Direction | 14 | Q1, Q2, Q3, Q4, Q5, Q6 |
| Stimulation | 11 | Q1, Q2, Q3, Q5 |
| Hedonism | 6 | Q1, Q6 |
| Achievement | 13 | Q1, Q2, Q3, Q4, Q6 |
| Power | 10 | Q2, Q3, Q4, Q5 |
| Security | 10 | Q1, Q2, Q4, Q5 |
| Conformity | 9 | Q2, Q4, Q5 |
| Tradition | 4 | Q5 |
| Benevolence | 13 | Q1, Q2, Q3, Q4, Q6 |
| Universalism | 8 | Q2, Q4, Q6 |

**Opmerking:** Tradition en Hedonism hebben minder directe vragen — dat is bewust. In het Schwartz-model komen deze waarden minder sterk naar voren bij de meeste westerse populaties. In latere versies kunnen extra vragen worden toegevoegd gericht op deze waarden.

---

## Circumplex-validatie

Na berekening checkt het algoritme of het profiel circumplex-coherent is: waarden die tegenover elkaar staan (bijv. Self-Direction en Conformity, of Universalism en Power) mogen niet allebei hoog scoren.

```
OPPOSITES = [
    ("Self-Direction", "Conformity"),
    ("Self-Direction", "Security"),
    ("Stimulation", "Security"),
    ("Stimulation", "Conformity"),
    ("Achievement", "Benevolence"),
    ("Achievement", "Universalism"),
    ("Power", "Benevolence"),
    ("Power", "Universalism"),
]

for (a, b) in OPPOSITES:
    if importance[a] > 7 and importance[b] > 7:
        // Vraag één verdiepingsvraag om de spanning te verhelderen
        trigger_clarification_question(a, b)
```

Als twee tegengestelde waarden beide hoog scoren, stelt de app een extra vraag:

> *"Autonomie en veiligheid zijn allebei hoog bij jou. Kun je een situatie beschrijven waar je moest kiezen?"*

Dit verfijnt het profiel én is een rijke inzicht op zichzelf.

---

## Kwartaal Herintake

Elke 3 maanden: volledige nieuwe gedragsintake.

```
nieuw_profiel = bereken_profiel(nieuwe_intake)

verschuiving = {
    waarde: nieuw_profiel[waarde] - vorig_profiel[waarde]
    for waarde in alle_waarden
}

significante_verschuiving = [
    waarde for waarde in verschuiving
    if abs(verschuiving[waarde]) > 1.5
]

if significante_verschuiving:
    toon_life_chapter_notificatie()
    // "In het afgelopen kwartaal verschoof [waarde] significant.
    //  Herken je dat er iets veranderde in die periode?"
```

---

## Technische implementatie

### Data model

```typescript
type WaardeNaam =
  | "Self-Direction" | "Stimulation" | "Hedonism"
  | "Achievement" | "Power" | "Security"
  | "Conformity" | "Tradition" | "Benevolence" | "Universalism"

type WaardenScores = Record<WaardeNaam, number>  // 0-10

type Intake = {
  id: string
  userId: string
  timestamp: Date
  antwoorden: {
    vraagNummer: number
    voorkeursOptie: "A" | "B" | "C" | "D" | "open"
    gedragsOptie: "A" | "B" | "C" | "D" | "open"
    openTekstVoorkeur?: string
    openTekstGedrag?: string
  }[]
  berekendImportance: WaardenScores
  berekendLived: WaardenScores
  bevestigdImportance: WaardenScores   // na slider-verfijning
  bevestigdLived: WaardenScores
  top5: WaardeNaam[]
}

type WekelijkseReflectie = {
  id: string
  userId: string
  week: number
  waarde: WaardeNaam
  uitgedrukt: boolean
  tekst: string
  geblokkeerd?: string
  commitmentTekst: string
  commitmentResultaat?: "Ja" | "Deels" | "Nee"
}

type GebruikersProfiel = {
  userId: string
  huidigeImportance: WaardenScores
  huidigeLived: WaardenScores
  gapScores: WaardenScores            // importance - lived
  intakeGeschiedenis: Intake[]
  reflectieGeschiedenis: WekelijkseReflectie[]
  aangemaakt: Date
  profielVersie: number
}
```

### API endpoints (MVP)

```
POST /api/intake/start          → maak sessie aan
POST /api/intake/antwoord       → sla antwoord op
POST /api/intake/bereken        → bereken profiel na vraag 6
POST /api/intake/bevestig       → sla slider-waarden op

GET  /api/profiel               → haal huidig profiel op
POST /api/reflectie/maandag     → sla maandagreflectie op
POST /api/reflectie/vrijdag     → sla vrijdagcheck-in op
GET  /api/reflectie/geschiedenis → haal reflecties op
```

---

## Samenvatting: wat dit algoritme uniek maakt

1. **Gedrag als bron** — profiel komt uit wat iemand deed, niet alleen uit wat ze zeggen te willen
2. **Gap is ingebakken** — de Values Bridge gap wordt uit de intake zelf gedestilleerd, niet als aparte vraag
3. **Slider als verfijning** — gebruiker corrigeert een data-gedreven spiegel, geen blanco invulling
4. **Circumplex-validatie** — het profiel wordt getoetst op theoretische coherentie
5. **Lerend profiel** — weekse reflecties verfijnen het profiel over tijd
6. **LLM-optie** — open tekst werkt via Claude API classificatie, zelfde output als multiple choice

---

*Algoritme versie 1.0 — Juni 2026*
