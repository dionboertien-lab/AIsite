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
    voorkeursPrompt: 'Wat zou je het liefst doen?',
    gedragsPrompt: 'En de laatste keer dat dit echt gebeurde — wat deed je toen werkelijk?',
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
    voorkeursPrompt: 'Wat zou je het liefst doen?',
    gedragsPrompt: 'En de laatste keer dat dit speelde — wat deed je toen echt?',
    opties: [
      { id: 'A', label: 'Doen wat ik zelf het juiste vind, ook als dat schuring geeft' },
      { id: 'B', label: 'Zoeken naar wat voor iedereen werkt' },
      { id: 'C', label: 'Volgen wat er van mij verwacht wordt' },
      { id: 'D', label: 'Anderen overtuigen van mijn gelijk' },
    ],
  },
  {
    nummer: 3,
    tekst: 'Denk aan een moment van de afgelopen weken waar je trots op was.',
    voorkeursPrompt: 'Wat zou jou idealiter het meest voldoening geven?',
    gedragsPrompt: 'En jouw concrete moment — wat maakte dát waardevol?',
    opties: [
      { id: 'A', label: 'Iets voor elkaar krijgen dat moeilijk was' },
      { id: 'B', label: 'Iemand helpen of iets bijdragen' },
      { id: 'C', label: 'Erkenning of waardering van anderen krijgen' },
      { id: 'D', label: 'Iets maken of ontdekken dat nieuw was' },
    ],
  },
  {
    nummer: 4,
    tekst: 'Er is frictie of oneerlijkheid in jouw omgeving.',
    voorkeursPrompt: 'Hoe zou je het liefst reageren?',
    gedragsPrompt: 'En de laatste keer dat het echt gebeurde — wat deed je toen?',
    opties: [
      { id: 'A', label: 'Me uitspreken, ook als dat oncomfortabel is' },
      { id: 'B', label: 'De harmonie proberen te bewaren' },
      { id: 'C', label: 'Me er zo veel mogelijk uit terugtrekken' },
      { id: 'D', label: 'Het direct aanpakken en oplossen' },
    ],
  },
  {
    nummer: 5,
    tekst: 'Er komt een grote verandering op je af — nieuw werk, nieuwe plek, nieuw begin.',
    voorkeursPrompt: 'Hoe zou je er idealiter mee omgaan?',
    gedragsPrompt: 'En de vorige keer dat dit gebeurde — hoe reageerde je toen echt?',
    opties: [
      { id: 'A', label: 'Het als kans zien — verandering geeft mij energie' },
      { id: 'B', label: 'Voorzichtig zijn, willen weten waar ik aan toe ben' },
      { id: 'C', label: 'Me aanpassen, maar vasthouden aan wat werkt' },
      { id: 'D', label: 'Het zelf sturen — controle over de richting houden' },
    ],
  },
  {
    nummer: 6,
    tekst: 'Denk aan een recent moment waarop je je volledig op je plek voelde.',
    voorkeursPrompt: 'Wat zou zo\'n moment idealiter bevatten?',
    gedragsPrompt: 'En jouw concrete moment — wat was er toen werkelijk aan de hand?',
    opties: [
      { id: 'A', label: 'Bezig zijn met iets dat ik zelf koos en in geloof' },
      { id: 'B', label: 'Samen zijn met mensen die er voor me doen' },
      { id: 'C', label: 'Bezig zijn met iets dat verder gaat dan mezelf' },
      { id: 'D', label: 'Volledig genieten, zonder verplichtingen' },
    ],
  },
  {
    nummer: 7,
    tekst: 'Je hebt wat geld over dat je vrij mag besteden.',
    voorkeursPrompt: 'Waar gaat je voorkeur naar uit?',
    gedragsPrompt: 'En de laatste keer dat dit zo was — wat deed je toen echt?',
    opties: [
      { id: 'A', label: 'Iets puur voor mijn eigen genot' },
      { id: 'B', label: 'Het opzij zetten voor zekerheid' },
      { id: 'C', label: 'Investeren in iets dat me verder brengt' },
      { id: 'D', label: 'Een nieuwe ervaring opzoeken' },
    ],
  },
  {
    nummer: 8,
    tekst: 'Een familietraditie of vaste gewoonte komt weer langs.',
    voorkeursPrompt: 'Hoe sta je daar het liefst in?',
    gedragsPrompt: 'En de laatste keer — wat deed je toen werkelijk?',
    opties: [
      { id: 'A', label: 'Eraan vasthouden — ik koester rituelen en gewoonten' },
      { id: 'B', label: 'Liever breken met de traditie en het op mijn manier doen' },
      { id: 'C', label: 'Meedoen uit respect voor familie of gemeenschap' },
      { id: 'D', label: 'Vooral meedoen omdat het gezellig is' },
    ],
  },
  {
    nummer: 9,
    tekst: 'Je leest iets over onrecht of ongelijkheid in de wereld.',
    voorkeursPrompt: 'Wat past het meest bij jou?',
    gedragsPrompt: 'En toen het echt op je pad kwam — wat deed je toen?',
    opties: [
      { id: 'A', label: 'Me inzetten voor een eerlijkere wereld, ook in het klein' },
      { id: 'B', label: 'Me richten op invloed en zelf vooruitkomen' },
      { id: 'C', label: 'Het bij mijn eigen kring en veiligheid houden' },
      { id: 'D', label: 'Concreet mensen om me heen helpen' },
    ],
  },
  {
    nummer: 10,
    tekst: 'Je staat voor de keuze: nu genieten of het uitstellen voor later.',
    voorkeursPrompt: 'Wat heeft je voorkeur?',
    gedragsPrompt: 'En de laatste keer dat dit speelde — wat deed je toen echt?',
    opties: [
      { id: 'A', label: 'Plezier nu, ook al kost het me later iets' },
      { id: 'B', label: 'Genot uitstellen voor een groter doel' },
      { id: 'C', label: 'Doen wat hoort, ook al heb ik er geen zin in' },
      { id: 'D', label: 'Mijn eigen zin volgen, los van verwachtingen' },
    ],
  },
]
