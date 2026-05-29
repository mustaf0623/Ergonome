# ⚡ Ergonome v7.6
### Calculateur Woyofal Senelec — PWA offline-first

> Maîtrisez votre consommation électrique Senelec.  
> Calculez, suivez, anticipez — sans jamais dépasser votre tranche.

Développé par **Mouhamadou Moustapha SY** · Étudiant AgroTIC · USSEIN · Sénégal  
Tarifs CRSE · Décision n°2025-140 · Janvier 2026

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Moteur statistique v7.6](#moteur-statistique-v76)
- [Architecture technique](#architecture-technique)
- [Déploiement GitHub Pages](#déploiement-github-pages)
- [Structure des fichiers](#structure-des-fichiers)
- [Historique des versions](#historique-des-versions)

---

## Aperçu

Ergonome est une **Progressive Web App (PWA)** conçue pour les consommateurs sénégalais utilisant le système Woyofal (prépayé Senelec). Elle fonctionne entièrement hors ligne, sans serveur, sans compte, sans publicité. Toutes les données restent sur l'appareil de l'utilisateur via IndexedDB.

---

## Fonctionnalités

### ⚡ Multi-compteurs
Gérez plusieurs compteurs Woyofal indépendants depuis une seule application.

- Créez jusqu'à **8 compteurs** nommés (Maison, Boutique, Atelier…)
- Chaque compteur a son **icône** (20 choix) et sa **couleur** (12 choix)
- **Isolation totale des données** — recharges, relevés et profil strictement séparés par compteur
- Bascule instantanée entre compteurs depuis la **barre de chips** dans le header
- Compteur par défaut créé automatiquement au premier lancement

### 💱 Convertisseur (double sens)
- **FCFA → kWh** : calcul détaillé (redevance, taxe communale 2,5%, tranches T1/T2/T3)
- **kWh → FCFA** : montant exact à recharger pour une quantité de kWh souhaitée
- Grille tarifaire 2026 intégrée et paramétrable
- **Durée personnalisée** : si le profil est calibré, affiche combien de jours dureront les kWh avec intervalle de confiance, indicateur CV (stable / variable / erratique) et date concrète de prochaine recharge

### 📊 Suivi mensuel
- Enregistrement des recharges (date + montant)
- Navigation par mois avec onglets
- Jauge visuelle T1 / T2 / T3 en temps réel
- Calcul automatique de la tranche, kWh restants avant seuil
- Suggestions contextuelles d'optimisation
- Historique avec suppression individuelle ou réinitialisation mensuelle
- **Bannière rappel relevé** : si aucun relevé depuis 7 jours et profil pas encore stable, une bannière contextuelle invite à faire un relevé avec accès direct au formulaire

### 🔋 Relevés compteur
Intégré dans le Suivi, ce module alimente le moteur statistique.

- Saisie hebdomadaire du solde kWh affiché sur le compteur
- Calcul automatique du **taux journalier pondéré** entre deux relevés consécutifs
- Historique des relevés avec suppression individuelle
- Chaque relevé est lié à son compteur — aucun mélange possible

### 🎯 Profil de calibration — Moteur v7.6
Moteur statistique inférentiel progressif avec 8 corrections appliquées.

- **Jauge de calibration** 0 → 92% avec couleur progressive (rouge → orange → vert)
- Calcul de **x̄ pondéré** (taux moyen pondéré par durée), **médiane**, **σ** (écart-type), **CV** (coefficient de variation), **IC95%** t-Student
- Score de calibration sans bonus artificiel — valeur honnête
- Messages contextuels selon la phase + **phrase d'action concrète** (geste précis à faire)
- **Détection automatique de dérive** : seuil adaptatif 1,5σ si n < 8, 2σ sinon
- **Alerte de recalibration** si le profil vieillit ou si une dérive est détectée

### 🎯 Planifier
Deux modes complémentaires alimentés par le Suivi et le profil calibré.

**💰 Simuler une recharge**
- Entre un montant → fourchette min/mid/max, verdict tranche
- Durée personnalisée avec date d'épuisement et confiance %
- Option solde compteur pour calculs exacts

**📅 Plan de charge**
- Champ conso/jour pré-rempli depuis le profil calibré (moyenne pondérée)
- Calcul du montant optimal pour les jours restants du mois
- Meilleur moment pour recharger selon la tranche en cours

### 💰 Mes Économies
Panel proactif d'anticipation — suggestions **avant** l'achat, jamais après.

- **Alerte proactive urgente** : si le solde estimé s'épuise dans moins de 5 jours, alerte immédiate avec montant exact (niveaux : rouge ≤2j / orange ≤4j / vert anticipation)
- **Prochaine recharge recommandée** : montant optimal au FCFA près pour rester en T1
- **Économies réalisées** : total économisé, projection annuelle, score T1 global, meilleur mois
- **Plan optimal du mois** : kWh estimés, déjà rechargés, restants, verdict T1/T2
- **Déverrouillage progressif** en 4 niveaux selon les données disponibles

### 📁 Données
- Tableau complet de toutes les recharges avec filtre par mois
- Statistiques globales (mois suivis, kWh/mois moyen pondéré, FCFA/kWh moyen)
- Suppression individuelle de n'importe quelle entrée

### 📄 Rapports — *Nouveau v7.6*
Génération de rapports de consommation directement dans l'app, accessible depuis Paramètres.

**Rapport mensuel**
- KPIs : FCFA rechargés, kWh obtenus, nombre de recharges, économies vs T2
- Jauges T1/T2/T3 avec verdict contextuel (excellent / attention / dépassement)
- Tableau chronologique des recharges avec badge de tranche et cumul
- Profil de consommation : taux moyen, σ, CV, score de calibration
- Conseil personnalisé basé sur les données réelles du mois

**Rapport annuel**
- Graphique en barres mensuel (mois futurs grisés honnêtement)
- Bilan annuel : kWh total, FCFA économisés, score T1 global, projections 12 mois
- Analyse de tendance H1 vs H2, mois économique/consommateur, dépassements détectés
- Recommandation annuelle avec projection d'économies

**Téléchargement** : le rapport est exporté en fichier HTML standalone. Ouvrir dans Chrome + Ctrl+P → Enregistrer en PDF.

### ⚙️ Paramètres
- Tarifs modifiables (redevance, T1, T2, taxe communale)
- Retour aux valeurs par défaut CRSE 2026
- **Export JSON** : sauvegarde complète des données (recharges, relevés, compteurs, config) — disponible à tout moment, sans restriction
- **Import JSON** : restauration complète sur un autre appareil ou après réinstallation — recharge l'état complet et reconstruit l'UI dans le bon ordre
- **Badge sauvegarde** : rappel discret si aucun export depuis plus de 30 jours (non bloquant)
- Réinitialisation complète de toutes les données

### 🚀 Onboarding
Au premier lancement (aucune donnée), un guide en 3 étapes explique :
1. Comment enregistrer une recharge dans Suivi
2. Comment noter un relevé compteur
3. Comment la calibration fonctionne

Une fois terminé, l'onboarding ne réapparaît jamais.

---

## Moteur statistique v7.6

### Corrections appliquées (vs v7.5)

| # | Problème v7.5 | Correction v7.6 | Impact |
|---|---|---|---|
| 1 | Filtre `jours≤21` ignorait les intervalles 22–45j | Filtre élargi à 45j + poids dégressif (1,0 / 0,8 / 0,5) | Moins de données perdues |
| 2 | Moyenne simple : intervalles de durées différentes pesaient pareil | Moyenne pondérée par `durée × poids` | +10–30% précision durées |
| 3 | n=1 : sigma fictif `moy×0,5` inventé | Retour propre sans sigma — message clair | Suppression de données fictives |
| 4 | Score gonflé : bonus `+nFactor×20` injustifié | Score sans bonus, plafond 92% | Confiance honnête |
| 5 | Marge durée pouvait tomber à ±0 jours | Plancher `Math.max(2j, margeIC)` | Fourchette toujours honnête |
| 6 | Seuil dérive fixe 2σ même en calibration | Seuil adaptatif : 1,5σ si n<8, 2σ sinon | Alertes plus précoces |
| 7 | `getSuiviData()` prenait le dernier taux brut | Moyenne pondérée cohérente avec `getProfil()` | Cohérence inter-modules |
| 8 | `renderDT()` moyenne simple en fallback | Moyenne pondérée alignée sur le moteur | Données identiques partout |

### Formules

```
Taux journaliers  = ΔkWh / Δjours  (intervalles 3–45j, consommation positive)
Poids intervalle  = 1,0 si ≤14j / 0,8 si ≤30j / 0,5 sinon
x̄ pondéré        = Σ(tᵢ × joursᵢ × poidsᵢ) / Σ(joursᵢ × poidsᵢ)
Médiane           = valeur centrale du tableau trié (robuste aux outliers)
σ (Bessel)        = √(Σ(tᵢ − x̄)² / (n−1))
CV                = σ / x̄  (< 0,2 stable / < 0,5 variable / ≥ 0,5 erratique)
Erreur standard   = σ / √n
t-Student         = 1,96 (n≥30) / 2,09 (n≥20) / 2,23 (n≥10) / 2,57 (n≥5) / 3,18 (n≥3) / 4,30 sinon
IC95%             = t × erreur_standard
Score calibration = min(92%, nFactor × stabFactor × 100)
                    nFactor = 1 − e^(−n/4)
                    stabFactor = max(0, 1 − CV)
Durée estimée     = kWh / x̄  ±  max(2j, (IC95/x̄) × durée)
```

---

## Architecture technique

### Stack
```
HTML5 + CSS3 + JavaScript vanilla (ES2020)
IndexedDB (stockage persistant local)
Service Worker (cache offline)
Web App Manifest (installable PWA)
Zéro dépendance externe
```

### Stores IndexedDB (`ergonome_v75`)
| Store | Clé | Contenu |
|---|---|---|
| `recharges` | `id` (auto) | `{date, montant, kwh, premiere, cptId}` |
| `releves` | `id` (auto) | `{date, kwh, tauxCalc, cptId}` |
| `compteurs` | `id` | `{id, nom, icone, couleur, cree}` |
| `config` | `key` | Paramètres tarifs + compteur actif |

### Service Worker
- **Network-first** pour `index.html` (toujours la version la plus récente)
- **Cache-first** pour les assets statiques (icônes, manifest)
- Mise à jour automatique du cache à chaque nouvelle version

### Démarrage robuste
- `injectLogos()` appelé **avant** `init()` — logo visible même si IndexedDB échoue
- IndexedDB non fatale — l'app démarre en mode dégradé si le stockage est indisponible
- Splash fermé après 1,2s (normal) ou 5s max (garde-fou absolu)
- Erreurs affichées via overlay séparé — le splash n'est jamais écrasé

---

## Déploiement GitHub Pages

### Première mise en ligne
```bash
# 1. Créer un repository GitHub (ex: ergonome)
# 2. Uploader tous les fichiers du dossier
# 3. Aller dans Settings > Pages
# 4. Source : Deploy from a branch > main > / (root)
# 5. L'app sera accessible sur :
#    https://[ton-username].github.io/ergonome/
```

### Mise à jour
```bash
# Remplacer index.html dans le repository
# GitHub Pages se met à jour automatiquement en ~1 minute
```

### Installation sur Android
1. Ouvrir l'URL dans Chrome
2. Menu (⋮) → "Ajouter à l'écran d'accueil"
3. Ou utiliser la bannière d'installation automatique

### Installation sur iOS (Safari)
1. Ouvrir l'URL dans Safari
2. Bouton Partage → "Sur l'écran d'accueil"

> **Note iOS** : si IndexedDB est bloqué, désactiver "Réduire le suivi inter-sites" dans Paramètres → Safari → Confidentialité.

---

## Structure des fichiers

```
ergonome-v7.6/
├── index.html      # Application complète (HTML + CSS + JS — fichier unique)
├── manifest.json   # Manifest PWA (nom, icônes, couleurs, orientation)
├── sw.js           # Service Worker (cache offline, mise à jour automatique)
├── icon-16.png     # Favicon
├── icon-32.png     # Favicon HD
├── icon-180.png    # Apple Touch Icon
├── icon-192.png    # Android icon
├── icon-512.png    # Splash icon
└── README.md       # Ce fichier
```

---

## Historique des versions

| Version | Date | Nouveautés principales |
|---|---|---|
| **v7.6** | Mai 2026 | Moteur statistique : 8 corrections (filtre 45j, moyenne pondérée, médiane/CV, plafond 92%, plancher ±2j, seuil dérive adaptatif, cohérence inter-modules). Rapport mensuel et annuel PDF. Export/Import JSON. Onboarding 3 étapes. Bannière rappel relevé. Phrases d'action contextuelles. Démarrage robuste (splash, logo, IDB non fatale). |
| **v7.5** | Mai 2026 | Multi-compteurs : gestion de plusieurs compteurs Woyofal indépendants, isolation totale des données, barre de chips dans le header. |
| **v7.4** | Mai 2026 | Panel "Mes Économies" : suggestions proactives, alerte solde critique, montant optimal, plan mensuel, projection annuelle, déverrouillage progressif. |
| **v7.3** | Mai 2026 | Module Relevés compteur intégré dans le Suivi, moteur statistique inférentiel (x̄, σ, IC95%), profil de calibration progressif, durée personnalisée. |
| **v7.2** | Avr. 2026 | PWA complète : Convertisseur, Suivi mensuel, Planifier, Données/Stats, Service Worker offline, IndexedDB, manifest, logos SVG animés. |

---

## Licence

Usage personnel et éducatif.  
Tarifs basés sur la décision CRSE n°2025-140 — janvier 2026.  
Les tarifs Senelec peuvent évoluer — vérifiez et mettez à jour dans Paramètres si nécessaire.

---

*Ergonome v7.6 · Mouhamadou Moustapha SY · USSEIN · Sénégal*
