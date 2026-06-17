# Kern — Status & Voortgang

*Laatste update: juni 2026*

---

## Waar we zijn

Het concept, de methodologie, het algoritme en de MVP-scope zijn volledig uitgewerkt en vastgelegd. De volgende sessie kan direct starten met bouwen.

---

## Beslissingen die zijn genomen

| Onderwerp | Beslissing |
|---|---|
| Naam | Kern (werknaam) |
| Theoretisch fundament | Schwartz (meten) + Values Bridge (gap) + ACT (handelen) |
| Startpunt | Gedrag eerst — niet abstracte zelfrapportage |
| Kernbelofte | De gap tussen wie je bent en hoe je leeft wordt zichtbaar en krimpt |
| Platform | React Native + Expo (iOS + Android) + browser (voor sociale laag) |
| Taal | Nederlandstalig |
| Verdienmodel | Freemium + coach marketplace |
| AI/LLM | Alleen voor open tekst (premium), niet in MVP |
| MVP scope | Intake + profiel + gap + weekse reflectie — niets meer |

---

## Bestanden

| Bestand | Inhoud |
|---|---|
| `kern-concept.md` | Volledig visiedocument — concept, pillars, app flow, verdienmodel |
| `kern-mvp.md` | MVP scope — wat zit erin, wat niet, succesmaatstaven |
| `kern-backlog.md` | Alles buiten MVP — 8 fases + losse ideeën |
| `kern-algoritme.md` | Volledig algoritme — 6 vragen, weighting matrix, scoring, LLM-spec, data model |
| `kern-status.md` | Dit bestand |

---

## Het algoritme in één oogopslag

```
6 gedragsvragen
  ↓ elk met twee ankers: voorkeur + werkelijk gedrag
Weighting matrix (10 Schwartz-waarden)
  ↓ voorkeur → importance scores
  ↓ gedrag   → lived scores
Normalisatie → top 5 waarden
  ↓
Gap = importance - lived  (Values Bridge, automatisch berekend)
  ↓
Sliders voor gebruikersbevestiging
  ↓
Opgeslagen als baseline profiel
  ↓
Weekse reflecties verfijnen het profiel over tijd
```

---

## MVP Schermen (6 totaal)

1. Onboarding — Gedragsintake (6 vragen)
2. Onboarding — Waardenprofiel reveal
3. Onboarding — Gap meting (sliders)
4. Home Dashboard
5. Weekse Reflectie (maandag + vrijdag)
6. Profielpagina

---

## Wat volgende sessie te doen

**Direct volgende stap: technische setup**

1. React Native + Expo project initialiseren
2. Mappenstructuur bepalen
3. Navigatiestructuur opzetten (React Navigation)
4. De 6 onboarding-schermen bouwen
5. Scoringsalgoritme implementeren in TypeScript

**Of eerst:** schermen ontwerpen (wireframes) voor de 6 MVP-schermen — dan weet je wat je bouwt voordat je code schrijft.

---

## Openstaande vragen voor later

- Definitieve naam (Kern is werknaam)
- Visuele identiteit / kleurpalet
- Exacte tekst van de 6 vragen (Nederlands, A/B/C/D opties)
- Push notificatie strategie (maandag + vrijdag ritme)
- Backend keuze (Supabase / Firebase / eigen)
- App Store / Play Store developer accounts

---

## Niet vergeten

- Schwartz PVQ-21 is public domain — vrij te gebruiken
- ACT-principes zijn vrij — eigen vragen schrijven, geen worksheets kopiëren
- Values Bridge concept is vrij — eigen implementatie
- LLM-classificatie (Claude Haiku) kost ~$0,001 per intake — alleen voor premium, niet in MVP
- Coach marketplace: coaches betalen voor leads én voor zichtbaarheid (twee stromen)
