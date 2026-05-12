# ⚡ Ergonome v7.5
### Calculateur Woyofal Senelec — PWA offline-first

> Maîtrisez votre consommation électrique Senelec.  
> Calculez, suivez, anticipez — sans jamais dépasser votre tranche.

Développé par **Mouhamadou Moustapha SY** · Étudiant AgroTIC · USSEIN · Sénégal  
Tarifs CRSE · Décision n°2025-140 · Janvier 2026

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Architecture technique](#architecture-technique)
- [Déploiement GitHub Pages](#déploiement-github-pages)
- [Structure des fichiers](#structure-des-fichiers)
- [Historique des versions](#historique-des-versions)

---

## Aperçu

Ergonome est une **Progressive Web App (PWA)** conçue pour les consommateurs sénégalais utilisant le système Woyofal (prépayé Senelec). Elle fonctionne entièrement hors ligne, sans serveur, sans compte, sans publicité. Toutes les données restent sur l'appareil de l'utilisateur via IndexedDB.

---

## Fonctionnalités

### ⚡ Multi-compteurs — *Nouveau v7.5*
Gérez plusieurs compteurs Woyofal indépendants depuis une seule application.

- Créez jusqu'à **8 compteurs** nommés (Maison, Boutique, Atelier…)
- Chaque compteur a son **icône** (20 choix) et sa **couleur** (12 choix)
- **Isolation totale des données** — recharges, relevés et profil strictement séparés par compteur
- Bascule instantanée entre compteurs depuis la **barre de chips** dans le header
- **Vue consolidée** — total FCFA et kWh de tous les compteurs en un coup d'œil
- Compteur par défaut créé automatiquement au premier lancement

### 💱 Convertisseur (double sens)
- **FCFA → kWh** : calcul détaillé (redevance, taxe communale 2,5%, tranches T1/T2/T3)
- **kWh → FCFA** : montant exact à recharger pour une quantité de kWh souhaitée
- Grille tarifaire 2026 intégrée et paramétrable
- **Durée personnalisée** : si le profil est calibré, affiche combien de jours dureront les kWh pour cet utilisateur spécifique, avec intervalle de confiance

### 📊 Suivi mensuel
- Enregistrement des recharges (date + montant)
- Navigation par mois avec onglets
- Jauge visuelle T1 / T2 / T3 en temps réel
- Calcul automatique de la tranche, kWh restants avant seuil
- Suggestions contextuelles d'optimisation
- Historique avec suppression individuelle ou réinitialisation mensuelle

### 🔋 Relevés compteur — *Nouveau v7.3*
Intégré dans le Suivi, ce module alimente le moteur statistique.

- Saisie hebdomadaire du solde kWh affiché sur le compteur
- Calcul automatique du **taux journalier** entre deux relevés consécutifs
- Historique des relevés avec suppression individuelle
- Chaque relevé est lié à son compteur — aucun mélange possible

### 🎯 Profil de calibration — *Nouveau v7.3*
Moteur statistique inférentiel progressif.

- **Jauge de calibration** 0 → 95% avec couleur progressive (rouge → orange → vert)
- Calcul de **x̄** (taux moyen), **σ** (écart-type), **IC95%** (intervalle de confiance)
- Score basé sur la loi des grands nombres et la stabilité de σ
- Messages contextuels selon la phase : démarrage / calibration / profil stable
- **Détection automatique de dérive** : alerte si la consommation récente s'écarte significativement de la moyenne historique (règle des 2σ)
- **Alerte de recalibration** si le profil vieillit ou si une dérive est détectée

### 🎯 Planifier
Deux modes complémentaires alimentés par le Suivi et le profil calibré.

**💰 Simuler une recharge**
- Entre un montant → fourchette min/mid/max, verdict tranche
- Durée personnalisée avec date d'épuisement et confiance %
- Option solde compteur pour calculs exacts

**📅 Plan de charge**
- Champ conso/jour pré-rempli automatiquement depuis le profil calibré
- Calcul du montant optimal pour les jours restants du mois
- Meilleur moment pour recharger selon la tranche en cours

### 💰 Mes Économies — *Nouveau v7.4*
Panel proactif d'anticipation — suggestions **avant** l'achat, jamais après.

- **Alerte proactive urgente** : si le solde estimé s'épuise dans moins de 5 jours, alerte immédiate avec montant exact et économie potentielle (niveaux : rouge ≤2j / orange ≤4j / vert anticipation)
- **Prochaine recharge recommandée** : montant optimal au FCFA près pour rester en T1, avec économie vs habitude et niveau de confiance
- **Économies réalisées** : total économisé sur tous les mois, projection annuelle, score T1 global, meilleur mois
- **Plan optimal du mois** : kWh estimés, déjà rechargés, restants, verdict T1/T2
- **Déverrouillage progressif** en 4 niveaux selon les données disponibles

### 📁 Données
- Tableau complet de toutes les recharges avec filtre par mois
- Statistiques globales (mois suivis, kWh/mois moyen, FCFA/kWh moyen)
- Suppression individuelle de n'importe quelle entrée

### ⚙️ Paramètres
- Tarifs modifiables (redevance, T1, T2, taxe communale)
- Retour aux valeurs par défaut CRSE 2026
- Réinitialisation complète de toutes les données

---

## Architecture technique

### Stack
```
HTML5 + CSS3 + JavaScript vanilla (ES2020)
IndexedDB (stockage persistant local)
Service Worker (cache offline)
Web App Manifest (installable PWA)
```

### Stores IndexedDB (`ergonome_v75`)
| Store | Clé | Contenu |
|---|---|---|
| `recharges` | `id` (auto) | `{date, montant, kwh, premiere, cptId}` |
| `releves` | `id` (auto) | `{date, kwh, tauxCalc, cptId}` |
| `compteurs` | `id` | `{id, nom, icone, couleur, cree}` |
| `config` | `key` | Paramètres tarifs + compteur actif |

### Moteur statistique inférentiel
```
Taux journaliers  = ΔkWh / Δjours  (entre relevés consécutifs)
Moyenne x̄        = Σtaux / n
Écart-type σ     = √(Σ(taux - x̄)² / (n-1))
Erreur standard  = σ / √n
IC95%            = t_critique × erreur_standard
Score calibration = f(n, stabFactor) → sature à 95%
Durée estimée    = kWh_achetés / x̄  ± marge_IC
```

### Service Worker
- **Network-first** pour `index.html` (toujours la version la plus récente)
- **Cache-first** pour les assets statiques (icônes, manifest)
- Mise à jour automatique du cache à chaque nouvelle version

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
# Remplacer index.html et sw.js dans le repository
# GitHub Pages se met à jour automatiquement en ~1 minute
# Les utilisateurs reçoivent la nouvelle version au prochain chargement
```

### Installation sur Android
1. Ouvrir l'URL dans Chrome
2. Menu (⋮) → "Ajouter à l'écran d'accueil"
3. Ou utiliser la bannière d'installation qui apparaît automatiquement

### Installation sur iOS (Safari)
1. Ouvrir l'URL dans Safari
2. Bouton Partage → "Sur l'écran d'accueil"

---

## Structure des fichiers

```
ergonome-v7.5/
├── index.html      # Application complète (HTML + CSS + JS en un seul fichier)
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
| **v7.5** | Mai 2026 | Multi-compteurs : gestion de plusieurs compteurs Woyofal indépendants, isolation totale des données, vue consolidée, barre de chips dans le header |
| **v7.4** | Mai 2026 | Panel "Mes Économies" : suggestions proactives anticipées, alerte solde critique, montant optimal, plan mensuel, projection annuelle, déverrouillage progressif |
| **v7.3** | Mai 2026 | Module Relevés compteur intégré dans le Suivi, moteur statistique inférentiel (x̄, σ, IC95%), profil de calibration progressif, durée personnalisée dans Convertisseur et Planifier |
| **v7.2** | Avr. 2026 | PWA complète : Convertisseur, Suivi mensuel, Planifier (Simuler + Plan de charge), Données/Stats, Service Worker offline, IndexedDB, manifest, logos SVG animés |

---

## Licence

Usage personnel et éducatif.  
Tarifs basés sur la décision CRSE n°2025-140 — janvier 2026.  
Les tarifs Senelec peuvent évoluer — vérifiez et mettez à jour les paramètres si nécessaire.

---

*Ergonome v7.5 · Mouhamadou Moustapha SY · USSEIN · Sénégal*
