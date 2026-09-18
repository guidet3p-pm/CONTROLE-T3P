// Base NATINF — T3P Contrôle
// Source : tableaux NATINF du guide (chapitres 1 et 2 + Annexe A pour recoupement).
// Avertissement repris du guide : les codes évoluent — à vérifier dans la base
// à jour avant toute rédaction définitive. Ne jamais déduire un NATINF à partir
// du seul texte réglementaire sans vérification.

const NATINF_DB = {
  '30761': { infraction: "Exercice de l'activité de conducteur de taxi sans carte professionnelle valide", profession: ['taxi'], classe: 'Contravention 5e classe', texte: 'L.3120-2-2, R.3124-12 C.transp.', tag: 'rapport' },
  '30760': { infraction: "Carte professionnelle non apposée sur le véhicule de façon visible de l'extérieur", profession: ['taxi', 'vtc', 'loti'], classe: 'Contravention 1re classe', texte: 'R.3124-12, R.3120-1 C.transp.', tag: 'pve' },
  '30763': { infraction: 'Non-présentation immédiate de la carte professionnelle', profession: ['taxi', 'vtc', 'loti'], classe: 'Contravention 2e classe', texte: 'R.3124-12 C.transp.', tag: 'pve' },
  '22874': { infraction: "Conduite d'un taxi sans attestation préfectorale d'aptitude physique", profession: ['taxi'], classe: 'Contravention 4e classe, -3 points', texte: 'R.221-10 C.route ; R.3120-1 C.transp.', tag: 'pve' },
  '2913': { infraction: 'Non-respect de la réglementation relative aux tarifs des courses de taxi', profession: ['taxi'], classe: 'Contravention 5e classe', texte: 'R.410-1 C.commerce, arrêté préfectoral tarifaire', tag: 'rapport' },
  '2893': { infraction: 'Refus de délivrance du ticket ou de la note de fin de course', profession: ['taxi'], classe: 'Contravention 5e classe (droit de la consommation)', texte: 'Code de la consommation, arrêté taxi', tag: 'rapport' },
  '23354': { infraction: "Exercice de l'activité d'exploitant taxi sans ADS", profession: ['taxi'], classe: 'Délit — 1 an / 15 000 €', texte: 'L.3124-4 C.transp.', tag: 'rapport', opj: true },
  '27746': { infraction: "Conduite d'une VTC sans attestation préfectorale d'aptitude physique", profession: ['vtc'], classe: 'Contravention 4e classe, -3 points', texte: 'R.221-10 C.route ; R.3120-1 C.transp.', tag: 'pve' },
  '30766': { infraction: 'Circulation ou stationnement en quête de clients (maraude physique)', profession: ['vtc'], classe: 'Contravention 5e classe', texte: 'L.3120-2 §II 2°, L.3120-1, R.3120-2, R.3124-11 C.transp.', tag: 'rapport' },
  '30767': { infraction: 'Prise en charge sans réservation préalable', profession: ['vtc'], classe: 'Contravention 5e classe', texte: 'L.3120-2 §II 3°, L.3120-1, D.3120-3, R.3124-11 C.transp.', tag: 'rapport' },
  '30769': { infraction: 'Maraude électronique (information irrégulière localisation/disponibilité)', profession: ['vtc'], classe: 'Contravention 5e classe', texte: 'L.3120-2 C.transp., jurisprudence Cass. com. 25/06/2025', tag: 'rapport' },
  '30756': { infraction: 'Exploitation VTC sans inscription au REVTC', profession: ['vtc'], classe: 'Délit', texte: 'L.3124-7 I,II ; L.3122-1 ; L.3122-3 ; R.3122-2 ; R.3122-4 C.transp.', tag: 'rapport', opj: true },
  '30899': { infraction: 'Absence de vignette réglementaire, partielle ou totale (C4)', profession: ['vtc'], classe: 'Contravention 4e classe', texte: 'C.transp.', tag: 'pve' },
};

function natinfFor(code) {
  return NATINF_DB[code] ? { code, ...NATINF_DB[code] } : null;
}
