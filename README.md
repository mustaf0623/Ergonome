# ⚡ Ergonome v7.5
### Calculateur Woyofal Senelec — PWA offline-first

> Maîtrisez votre consommation électrique Senelec.  
> Calculez, suivez, anticipez — sans jamais dépasser votre tranche.

Développé par **Mouhamadou Moustapha SY** · Étudiant AgroTIC · USSEIN · Sénégal  
Tarifs CRSE · Décision n°2025-140 · Janvier 2026

---
## Aperçu

Ergonome est une **Progressive Web App (PWA)** conçue pour les consommateurs sénégalais utilisant le système Woyofal (prépayé Senelec). Elle fonctionne entièrement hors ligne, sans serveur, sans compte, sans publicité. Toutes les données restent sur l'appareil de l'utilisateur.

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

### 🎯 Profil de calibration — 
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

### 📄 Rapports PDF— 
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
- Analyse de tendance , mois économique/consommateur, dépassements détectés
- Recommandation annuelle avec projection d'économies

**Téléchargement** : le rapport est exporté en fichier HTML standalone enregistrer en PDF.

### ⚙️ Paramètres
- Tarifs modifiables (redevance, T1, T2, taxe communale)
- Retour aux valeurs par défaut CRSE 2026
- **Export JSON** : sauvegarde complète des données (recharges, relevés, compteurs, config) — disponible à tout moment, sans restriction
- **Import JSON** : restauration complète sur un autre appareil ou après réinstallation — recharge l'état complet et reconstruit l'UI dans le bon ordre
- **Badge sauvegarde** : rappel discret si aucun export depuis plus de 30 jours (non bloquant)
- Réinitialisation complète de toutes les données

### 🚀 Onboarding
Au premier lancement (aucune donnée), un guide en 5 étapes explique toutes les fonctionnalités :
Comment enregistrer une recharge dans Suivi Comment noter un relevé compteur Comment la calibration fonctionne

```
### Installation sur Android
1. Ouvrir l'URL dans Chrome
2. Menu (⋮) → "Ajouter à l'écran d'accueil"
3. Ou utiliser la bannière d'installation automatique

### Installation sur iOS (Safari)
1. Ouvrir l'URL dans Safari
2. Bouton Partage → "Sur l'écran d'accueil"

---

## Licence

Usage personnel et éducatif.  
Tarifs basés sur la décision CRSE n°2025-140 — janvier 2026.  
Les tarifs Senelec peuvent évoluer — vérifiez et mettez à jour dans Paramètres si nécessaire.

---

*Ergonome v7.5 · Mouhamadou Moustapha SY · USSEIN · Sénégal*
