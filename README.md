# T3P Contrôle — Police Municipale

PWA de contrôle T3P (Taxi / VTC / LOTI) : guide, fiches réflexes,
NATINF, ressources et générateur de rapport/PV. Basée sur le guide
opérationnel interne (Police Municipale de Villefranche-sur-Mer).

## État actuel — v5

- ✅ Application installable, fonctionnement hors ligne (service worker)
- ✅ Navigation d'accueil en grille 2 colonnes, lien « Signaler un bug »
- ✅ **Arbre décisionnel** (`/outils/identification.html`)
- ✅ **Module Contrôle — Taxi et VTC**, moteur générique et piloté par les
  données (`/outils/controle-view.html?p=taxi|vtc`, logique dans
  `/js/controle-engine.js`, données dans `/js/data-professions.js` et
  `/js/data-natinf.js`) :
  - Catégories Conducteur / Exploitant / Véhicule / Course par item
  - Description courte sous chaque nom de document
  - États adaptés à la nature de l'item (ex. carte pro VTC : présente et
    apposée / non apposée / non présentée)
  - Compteur de progression
  - Analyse : NATINF, classe, RAPPORT/PVE à partir de la base commune ;
    dit explicitement quand aucun NATINF dédié n'existe plutôt que d'en
    inventer un
  - Favoris (⭐) sur les NATINF depuis l'écran d'analyse
  - LOTI / VMDTR / CPA à ajouter sur le même moteur (juste des données à
    compléter, pas de nouvel écran à coder)
- ✅ **Favoris** (`/outils/favoris.html`) : NATINF actifs ; fiches réflexes et
  fiches techniques prêtes à recevoir des favoris une fois ces écrans construits
- 🔍 **Guide contrôle T3P** (texte) : généré depuis le PDF ordinateur, **non
  raccordé à l'appli** — à relire/vérifier avant intégration (tuile
  « En relecture »). Disponible dans `/guide` pour relecture.
- ⏳ À construire ensuite : LOTI/VMDTR/CPA (données), fiches réflexes
  (Annexe D), fiches véhicules/conformité, bouton Visualiser (images des
  documents), générateur d'aide à la rédaction (géolocalisé)

Tous les chemins du projet sont **relatifs** : le site fonctionne aussi
bien à la racine d'un domaine qu'en sous-dossier de type
`utilisateur.github.io/nom-du-repo/` — aucune adaptation nécessaire
selon l'endroit où il est publié.

## Structure

```
├── index.html          Page d'accueil (coquille de navigation)
├── manifest.json        Nom, icônes, couleurs de l'application
├── sw.js                 Service worker (cache / mode hors ligne)
├── css/style.css        Palette et mise en page (bleu de l'écusson)
├── js/app.js             Enregistrement du service worker
└── icons/                Icônes générées depuis app-icon-ios-v12.png
```

## Publier sur GitHub Pages

1. Créer un dépôt (ou utiliser un dépôt existant) et y déposer le
   contenu de ce dossier à la racine (ou dans `/docs`, au choix).
2. `Settings → Pages → Source` : choisir la branche et le dossier
   utilisés (`main` / `root` ou `main` / `docs`).
3. GitHub fournit une URL en `https://…github.io/…` — l'app y est
   installable directement (HTTPS obligatoire pour le service worker,
   ce que Pages fournit nativement).
4. À chaque mise à jour du contenu, incrémenter `CACHE_VERSION` dans
   `sw.js` pour que les téléphones déjà installés récupèrent la
   nouvelle version.

## Notes techniques

- **Icônes** : générées depuis `app-icon-ios-v12.png` (180×180, seule
  résolution fournie). Correct à l'affichage, mais un master plus
  grand (1024×1024 si disponible) donnerait un rendu plus net sur les
  grandes tailles (icône 512, écran de démarrage Android).
- **Police** : pile système (`-apple-system`, Segoe UI, Roboto…) —
  volontaire : aucun chargement réseau, rendu instantané, cohérent
  avec l'usage hors ligne sur le terrain.

## Décisions actées depuis le cahier des charges

- Le guide « version smartphone » sera régénéré à partir du **PDF
  ordinateur** (`Guide_T3P_Police_Municipale_Version_Ordinateur.pdf`,
  84 p., 329 liens internes), tableaux adaptés à l'écran, avec
  sommaire et navigation chapitre précédent/suivant reconstruits en
  HTML natif. Le correctif de liens sur l'ancien
  `..._Smartphone_V18.pdf` est donc absorbé par cette refonte plutôt
  que traité séparément.
- Le modèle `RAPPORT_Vierge_MAJ.docx` sera intégré de façon anonymisée :
  les champs agent(s)/matricule(s)/commune deviendront des champs
  éditables dans l'app, sans valeur pré-remplie.
