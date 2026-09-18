// Items de contrôle par profession — T3P Contrôle
// Catégories : conducteur (documents liés à la conduite) / exploitant
// (statut professionnel) / vehicule (mise en circulation, équipements) / course.
// cycle : nom du jeu d'états applicable (voir CYCLES dans controle-engine.js).
// natinf : { <état> : <code NATINF> } — uniquement quand le guide fournit une
// correspondance directe et non ambiguë.

const PROFESSIONS = {
  taxi: {
    label: 'Taxi',
    icon: '🚕',
    chapitre: 'Chapitre 1',
    items: [
      { id: 'permis_ue', cat: 'conducteur', name: 'Permis de conduire', desc: "Permis de conduire de l'Union européenne, adapté au véhicule (catégorie B).", cycle: 'standard' },
      { id: 'carte_pro', cat: 'conducteur', name: 'Carte professionnelle de conducteur', desc: "Délivrée par la préfecture, présentée immédiatement. Non liée au véhicule : elle suit le chauffeur.", cycle: 'carte', natinf: { bad: '30761', warn: '30763' } },
      { id: 'attestation', cat: 'conducteur', name: "Attestation préfectorale d'aptitude physique", desc: 'Document distinct de la carte professionnelle ; périodicité selon l\u2019âge du conducteur.', cycle: 'standard', natinf: { bad: '22874' } },
      { id: 'ads', cat: 'vehicule', name: 'Autorisation de stationnement (ADS) / plaque', desc: 'Document propre à la commune de rattachement, attaché à un véhicule déterminé.', cycle: 'standard', natinf: { bad: '30760' }, note: "Absence totale d'ADS par l'exploitant (délit, NATINF 23354) à distinguer d'une carte simplement non apposée." },
      { id: 'immat', cat: 'vehicule', name: "Certificat d'immatriculation", desc: 'Cohérence avec le véhicule contrôlé.', cycle: 'standard' },
      { id: 'assurance', cat: 'vehicule', name: "Attestation d'assurance professionnelle", desc: 'Couvrant le transport de personnes à titre onéreux.', cycle: 'standard' },
      { id: 'carnet', cat: 'vehicule', name: 'Carnet métrologique du taximètre', desc: 'Lettre de vérification en cours de validité.', cycle: 'standard' },
      { id: 'visite', cat: 'vehicule', name: 'Contrôle technique annuel spécifique taxi', desc: 'Périodicité annuelle propre à l\u2019activité taxi.', cycle: 'standard' },
      { id: 'taximetre', cat: 'vehicule', name: 'Taximètre horodaté, scellé', desc: 'Positions tarifaires A/B/C/D correctement affichées.', cycle: 'standard' },
      { id: 'lumineux', cat: 'vehicule', name: 'Lumineux « Taxi » (vert/rouge)', desc: 'Signale la disponibilité ; vert = libre, rouge = occupé.', cycle: 'standard' },
      { id: 'terminal', cat: 'vehicule', name: 'Terminal de paiement électronique', desc: 'Obligatoire, en état de fonctionnement.', cycle: 'standard' },
      { id: 'imprimante', cat: 'vehicule', name: 'Imprimante reliée au taximètre', desc: 'Permet la délivrance du ticket de fin de course.', cycle: 'standard' },
      { id: 'ticket', cat: 'course', name: 'Ticket / note de fin de course', desc: 'Délivrance obligatoire, même sans demande du client au-delà du seuil réglementaire.', cycle: 'ticket', natinf: { bad: '2893' } },
      { id: 'tarifs', cat: 'course', name: 'Affichage et application des tarifs', desc: 'Position tarifaire cohérente avec le trajet (A/B/C/D).', cycle: 'standard', natinf: { bad: '2913' } },
    ]
  },
  vtc: {
    label: 'VTC',
    icon: '🚗',
    chapitre: 'Chapitre 2',
    items: [
      { id: 'permis_ue', cat: 'conducteur', name: 'Permis de conduire', desc: "Permis de conduire de l'Union européenne, adapté au véhicule.", cycle: 'standard' },
      { id: 'carte_pro_vtc', cat: 'conducteur', name: 'Carte professionnelle VTC', desc: 'Distinguer carte présente et apposée, présente mais non apposée, ou non présentée.', cycle: 'carte_vtc', natinf: { non_apposee: '30760', non_presentee: '30763' } },
      { id: 'attestation', cat: 'conducteur', name: "Attestation préfectorale d'aptitude physique", desc: 'Document distinct de la carte professionnelle.', cycle: 'standard', natinf: { bad: '27746' } },
      { id: 'revtc', cat: 'exploitant', name: 'Inscription au REVTC', desc: "Vérifier l'exploitant réel et l'inscription correspondant au véhicule contrôlé.", cycle: 'standard', natinf: { bad: '30756' }, note: 'Une inscription très récente peut ne pas encore apparaître : vérifier un éventuel macaron provisoire.' },
      { id: 'rcpro', cat: 'exploitant', name: 'RC professionnelle', desc: "Responsabilité civile professionnelle de l'exploitant, validité à jour.", cycle: 'standard' },
      { id: 'lien_salarie', cat: 'exploitant', name: 'Lien exploitant / chauffeur salarié', desc: 'Contrat, bulletin ou justificatif du rattachement si le chauffeur n\u2019est pas l\u2019exploitant.', cycle: 'na' },
      { id: 'vignette_avant', cat: 'vehicule', name: 'Vignette REVTC avant', desc: 'Concordance du numéro d\u2019immatriculation et du numéro REVTC.', cycle: 'standard', natinf: { bad: '30899' } },
      { id: 'vignette_arriere', cat: 'vehicule', name: 'Vignette REVTC arrière', desc: 'Concordance du numéro d\u2019immatriculation et du numéro REVTC.', cycle: 'standard', natinf: { bad: '30899' } },
      { id: 'certif_immat', cat: 'vehicule', name: "Certificat d'immatriculation", desc: 'Cohérence avec le véhicule et le macaron REVTC.', cycle: 'standard' },
      { id: 'controle_technique', cat: 'vehicule', name: 'Contrôle technique', desc: 'À jour, périodicité applicable au véhicule.', cycle: 'standard' },
      { id: 'assurance_onereux', cat: 'vehicule', name: 'Assurance transport à titre onéreux', desc: 'Validité et concordance avec exploitant/véhicule.', cycle: 'standard' },
      { id: 'age_vehicule', cat: 'vehicule', name: 'Âge du véhicule', desc: 'Moins de 7 ans à compter de la première immatriculation.', cycle: 'standard' },
      { id: 'reservation', cat: 'course', name: 'Réservation préalable', desc: 'Justificatif antérieur à la prise en charge : heure, client, moyen de réservation.', cycle: 'standard', natinf: { bad: '30767' } },
      { id: 'maraude_physique', cat: 'course', name: 'Absence de maraude physique', desc: "Pas de stationnement ni circulation en quête de clients sur la voie publique.", cycle: 'standard', natinf: { bad: '30766' } },
      { id: 'maraude_electronique', cat: 'course', name: 'Absence de maraude électronique', desc: "Pas d'information irrégulière sur la localisation/disponibilité du véhicule.", cycle: 'standard', natinf: { bad: '30769' } },
    ]
  }
};

const CAT_LABELS = { conducteur: 'Conducteur', exploitant: 'Exploitant', vehicule: 'Véhicule', course: 'Course' };
