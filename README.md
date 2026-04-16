# ⚡ Ergonome — Calculateur Woyofal Senelec

> **Maîtrisez votre consommation électrique au Sénégal.**
> Calculez, suivez et optimisez vos recharges Woyofal pour toujours acheter au meilleur tarif.

---

## 📱 Présentation

**Ergonome** est une application web progressive (PWA) conçue pour les consommateurs sénégalais utilisant le système prépayé **Woyofal** de Senelec. Elle fonctionne dans votre navigateur, sans compte, et **100% hors ligne** une fois chargée.

---

## 🎯 Fonctionnalités v7.2

### 💱 Convertisseur (double sens)
- **FCFA → kWh** : kWh nets obtenus après redevance et taxes
- **kWh → FCFA** : montant exact à payer pour une quantité souhaitée
- Détail complet : redevance, taxe communale, tranches T1/T2

### 📊 Suivi mensuel
- Enregistrement de chaque recharge avec date et montant
- Jauge visuelle temps réel (T1 / T2 / T3)
- Navigation entre les mois passés
- Historique avec suppression individuelle

### 🎯 Planifier (alimenté automatiquement par le Suivi)

**💰 Simuler une recharge** : entrez un montant → verdict + fourchette complète (minimum / recommandé / maximum strict avant seuil) + meilleur moment pour recharger

**📅 Plan de charge** : entrez conso/jour et jours restants → projection + fourchette recommandée

> Option précision : lisez le solde sur votre compteur (1 appui sur le bouton du boîtier) pour des calculs exacts.

### 📁 Données
- Historique filtrable par mois
- Statistiques globales et suggestions d'optimisation

---

## 📋 Grille tarifaire 2026

| Tranche | Consommation | Prix |
|---------|-------------|------|
| 🟢 T1 | 0 – 150 kWh/mois | **82 FCFA/kWh** |
| 🟡 T2 | 151 – 250 kWh/mois | **136,49 FCFA/kWh** |
| 🔴 T3 | > 250 kWh | **136,49 FCFA/kWh + TVA 18%** |

Taxe communale 2,5% · Redevance mensuelle sur la 1ère recharge uniquement (429–1 155 FCFA)

*Source : CRSE, décision n°2025-140, en vigueur au 1er janvier 2026*

---

## 🚀 Déploiement sur GitHub Pages

### Fichiers à déposer à la racine du dépôt

```
votre-repo/
├── index.html
├── sw.js
├── manifest.json
├── icon-16.png
├── icon-32.png
├── icon-180.png
├── icon-192.png
└── icon-512.png
```

### Activer GitHub Pages
1. **Settings** → **Pages**
2. Source : **Deploy from a branch** → branche **main** → dossier **/ (root)**
3. Cliquez **Save**

URL de l'application : `https://votre-pseudo.github.io/votre-repo/`

### Installation sur mobile
- **Android (Chrome)** : un banner d'installation apparaît automatiquement à la première visite
- **iPhone (Safari)** : Partager → **Sur l'écran d'accueil**

---

## 🔄 Mises à jour utilisateurs existants

Lorsque vous déposez un nouveau `index.html` sur GitHub :
- **Android** : mise à jour automatique via le service worker au prochain rechargement
- **iPhone** : fermer et rouvrir l'app suffit généralement

---

## 💾 Stockage des données

Les données sont dans **IndexedDB** — base de données intégrée au navigateur, sur votre appareil uniquement :
- Indépendante du cache navigateur (survit au "vider le cache")
- Jamais transmise à un serveur
- Disponible hors ligne

---

## 🔒 Confidentialité

Aucune collecte de données · Aucun serveur · Aucun compte requis · Aucune publicité

---

## 👨‍💻 Développeur

**Mouhamadou Moustapha SY**
Étudiant en 2ème année de Licence AgroTIC
USSEIN — Université du Sine Saloum El-Hadj Ibrahima Niass · Sénégal

*Ergonome v7.2 · Tarifs CRSE décision n°2025-140 · Janvier 2026*
