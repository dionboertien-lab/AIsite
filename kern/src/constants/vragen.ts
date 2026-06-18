export type Optie = {
  label: string
  id: 'A' | 'B' | 'C' | 'D'
}

export type Vraag = {
  nummer: number
  tekst: string
  voorkeursPrompt: string
  gedragsPrompt: string
  opties: Optie[]
}

export const VRAGEN: Vraag[] = [
  {
    nummer: 1,
    tekst: 'Je hebt een onverwachte vrije dag.',
    voorkeursPrompt: 'Wat trekt je het meest?',
    gedragsPrompt: 'Wat deed je de vorige keer dat dit echt zo was?',
    opties: [
      { id: 'A', label: 'Iets nieuws ontdekken of een avontuur in' },
      { id: 'B', label: 'Bijkomen, genieten, niks moeten' },
      { id: 'C', label: 'Iets nuttigs doen of verder komen' },
      { id: 'D', label: 'Tijd met mensen die ik lief heb' },
    ],
  },
  {
    nummer: 2,
    tekst: 'Je staat voor een keuze die anderen van je verwachten, maar die jij anders ziet.',
    voorkeursPrompt: 'Wat doe je het liefst?',
    gedragsPrompt: 'Wat deed je de laatste keer dat dit speelde?',
    opties: [
      { id: 'A', label: 'Ik doe wat ik zelf het juiste vind, ook als dat schuring geeft' },
      { id: 'B', label: 'Ik zoek wat voor iedereen werkt' },
      { id: 'C', label: 'Ik volg wat er van mij verwacht wordt' },
      { id: 'D', label: 'Ik overtuig anderen van mijn gelijk' },
    ],
  },
  {
    nummer: 3,
    tekst: 'Denk aan een moment van de afgelopen weken waar je trots op was.',
    voorkeursPrompt: 'Wat zou je het liefst als succes ervaren?',
    gedragsPrompt: 'Wat maakte jouw concrete moment waardevol?',
    opties: [
      { id: 'A', label: 'Ik heb iets voor elkaar gekregen dat moeilijk was' },
      { id: 'B', label: 'Ik heb iemand geholpen of iets bijgedragen' },
      { id: 'C', label: 'Ik werd erkend of gewaardeerd door anderen' },
      { id: 'D', label: 'Ik heb iets gemaakt of ontdekt dat nieuw was' },
    ],
  },
  {
    nummer: 4,
    tekst: 'Er is frictie of oneerlijkheid in jouw omgeving.',
    voorkeursPrompt: 'Hoe reageer jij het liefst?',
    gedragsPrompt: 'Wat deed je de laatste keer dat dit speelde?',
    opties: [
      { id: 'A', label: 'Ik spreek me uit, ook als dat oncomfortabel is' },
      { id: 'B', label: 'Ik probeer de harmonie te bewaren' },
      { id: 'C', label: 'Ik trek me er zo veel mogelijk uit terug' },
      { id: 'D', label: 'Ik pak het direct aan en los het op' },
    ],
  },
  {
    nummer: 5,
    tekst: 'Er komt een grote verandering op je af — nieuw werk, nieuwe plek, nieuw begin.',
    voorkeursPrompt: 'Hoe ga je er het liefst mee om?',
    gedragsPrompt: 'Hoe reageerde je de vorige keer?',
    opties: [
      { id: 'A', label: 'Ik zie het als kans — verandering geeft mij energie' },
      { id: 'B', label: 'Ik ben voorzichtig, ik wil weten waar ik aan toe ben' },
      { id: 'C', label: 'Ik pas me aan als het moet, maar hou vast aan wat werkt' },
      { id: 'D', label: 'Ik stuur het liever zelf — ik wil controle over de richting' },
    ],
  },
  {
    nummer: 6,
    tekst: 'Denk aan een recent moment waarop je je volledig op je plek voelde.',
    voorkeursPrompt: 'Wat zou zo\'n moment idealiter bevatten?',
    gedragsPrompt: 'Wat was er aan de hand in jouw concrete moment?',
    opties: [
      { id: 'A', label: 'Ik was bezig met iets dat ik zelf had gekozen en in geloof' },
      { id: 'B', label: 'Ik was samen met mensen die er voor me doen' },
      { id: 'C', label: 'Ik was bezig met iets dat verder gaat dan mezelf' },
      { id: 'D', label: 'Ik genoot volledig, zonder verplichtingen' },
    ],
  },
]
