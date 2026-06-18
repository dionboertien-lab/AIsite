# Kern

> *De afstand tussen wie je bent en hoe je leeft, wordt steeds kleiner.*

Een Nederlandstalige waardentest-app die je niet vraagt wie je wilt zijn, maar je
**betrapt** op wie je echt bent. Vertrekpunt is gedrag, niet abstracte
zelfrapportage. Kern is geen éénmalige test maar een wekelijks ritueel dat de
kloof tussen je waarden en je gedrag zichtbaar — en kleiner — maakt.

---

## Concept in het kort

Kern bouwt op drie theoretische lagen:

| Laag | Theorie | Functie |
|---|---|---|
| 1 — Meten | Schwartz Theory of Basic Values | Welke waarden heb jij? |
| 2 — Begrijpen | Values Bridge (held vs. expressed) | Leef je ze ook echt? |
| 3 — Handelen | ACT (Acceptance & Commitment Therapy) | Wat staat ertussen? Hoe verander je dat? |

Wat Kern onderscheidt van bestaande waardentests: **gedrag-eerst** (eerlijker dan
zelfrapportage), de **gap** als meetbare afstand die over tijd krimpt, een
**sociale spiegel** (perceptie van anderen) en een **coach marketplace** als
verdienmodel. Zie [`kern-concept.md`](./kern-concept.md) voor de volledige visie.

---

## Documentatie

| Document | Inhoud |
|---|---|
| [`kern-concept.md`](./kern-concept.md) | Volledige visie — concept, pillars, app flow, verdienmodel |
| [`kern-mvp.md`](./kern-mvp.md) | MVP-scope — wat zit erin, wat niet, succesmaatstaven |
| [`kern-backlog.md`](./kern-backlog.md) | Roadmap — 8 fases (spiegel → B2B) + losse ideeën |
| [`kern-algoritme.md`](./kern-algoritme.md) | Het scoringsalgoritme — matrix, normalisatie, gap, datamodel |
| [`kern-status.md`](./kern-status.md) | Voortgang, beslissingen en openstaande vragen |

---

## De app (`kern/`)

Een cross-platform Expo-app (iOS + Android + web) gebouwd met React Native en
TypeScript.

### Stack
- **Expo SDK 56** (React Native 0.85, React 19)
- **React Navigation 7** — stack (onboarding) + bottom tabs (hoofdapp)
- **AsyncStorage** — lokale, append-only opslag
- **React Context** — globale state (`src/store/KernContext.tsx`)

### Projectstructuur
```
kern/
├── App.tsx                     # Entry point + KernProvider
└── src/
    ├── lib/
    │   ├── algoritme/          # Schwartz matrix, scoring, types
    │   ├── storage.ts          # Append-only opslag + afgeleid profiel
    │   └── datum.ts            # Reflectiedag-bepaling
    ├── constants/              # Vragen + kleurpalet
    ├── navigation/             # Stack + tab navigatie
    ├── screens/
    │   ├── onboarding/         # Welkom → Intake → Reveal → Gap
    │   └── main/               # Home, Reflectie, Profiel
    └── store/                  # KernContext (globale state)
```

### Lokaal draaien
```bash
cd kern
npm install
npm start        # of: npm run ios / npm run android / npm run web
```

### Type-check
```bash
cd kern
npx tsc --noEmit
```

---

## Status

De MVP is gebouwd: gedragsintake → waardenprofiel → gap-meting → wekelijkse
reflectie. De code heeft een kritische review + fix-ronde doorlopen. Zie
[`kern-status.md`](./kern-status.md) voor details en volgende stappen.

**Bewust nog open:** backend/identiteit-keuze (nu lokaal), push notificaties,
en de features uit de [backlog](./kern-backlog.md).

---

## Licentie

Vrij te gebruiken. De onderliggende methodologie (Schwartz-theorie, PVQ-21,
ACT-principes) is vrij toepasbaar; specifieke gevalideerde vragenlijsten en
werkbladen van derden vallen onder hun eigen licenties.
