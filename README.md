# Application de Gestion des Tâches

Une application moderne de gestion des tâches construite avec Angular et Tailwind CSS qui aide les utilisateurs à organiser leurs tâches, suivre leur progression et gérer les catégories efficacement.

![Capture d'écran du Gestionnaire de Tâches](src\assets\image\image.png)

## Fonctionnalités

### Gestion des Tâches
- ✨ Créer, modifier et supprimer des tâches
- 🎯 Définir les priorités (Haute, Moyenne, Basse)
- 📊 Suivre le statut (À faire, En cours, Terminé)
- 📅 Gestion des dates d'échéance avec validation
- 🚨 Indicateurs visuels pour les tâches en retard
- 🏷️ Catégorisation des tâches pour une meilleure organisation

### Gestion des Catégories
- 📁 Créer et gérer des catégories de tâches
- 🔍 Filtrer les tâches par catégorie
- ✅ Validation des noms de catégorie uniques
- 🔄 Mises à jour en temps réel

### Recherche & Statistiques
- 🔎 Rechercher des tâches par nom ou description
- 📈 Tableau de bord statistique en temps réel
- 📊 Suivi des pourcentages d'achèvement
- ⏰ Surveillance des tâches en retard

## Technologies Utilisées

- **Frontend**: Angular 17
- **Style**: Tailwind CSS
- **Gestion d'État**: RxJS BehaviorSubject
- **Stockage**: Local Storage
- **Gestion des Formulaires**: Angular Reactive Forms

## Pour Commencer

### Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- Angular CLI

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/votrenomdutilisateur/gestion-taches.git
cd gestion-taches
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur de développement
```bash
ng serve
```

4. Ouvrir votre navigateur et accéder à `http://localhost:4200`

## Structure du Projet
```
src/
├── app/
│ ├── components/
│ │ ├── task-list/     # Liste et gestion des tâches
│ │ ├── task-form/     # Création et modification des tâches
│ │ ├── category-list/ # Gestion des catégories
│ │ ├── category-form/ # Création et modification des catégories
│ │ ├── search-bar/    # Fonctionnalité de recherche
│ │ └── statistiques/  # Tableau de bord statistique
│ ├── services/
│ │ ├── task.service.ts     # Gestion des données des tâches
│ │ └── category.service.ts # Gestion des données des catégories
│ ├── models/         # Interfaces de données
│ └── layout/        # Composants de mise en page communs
```

## Fonctionnalités Détaillées

### Gestion des Tâches
- Création de tâches avec titre, description, date d'échéance et priorité
- Validation des formulaires pour assurer l'intégrité des données
- Indicateurs visuels pour le statut et la priorité
- Mise en évidence des tâches en retard

### Système de Catégories
- Organisation des tâches en catégories
- Filtrage des tâches par catégorie
- Prévention des noms de catégorie en double
- Gestion facile des catégories

### Tableau de Bord Statistique
- Statistiques en temps réel sur l'achèvement des tâches
- Suivi de la progression
- Surveillance des tâches en retard
- Indicateurs de progression visuels

## Contribution

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/NouvellefonctionnalitéIncroyable`)
3. Committez vos changements (`git commit -m 'Ajout de NouvellefonctionnalitéIncroyable'`)
4. Poussez vers la branche (`git push origin feature/NouvellefonctionnalitéIncroyable`)
5. Ouvrez une Pull Request

## Auteur

Mokhlis Beklhaj


## Autre Outils

-[Jira](https://belhajmokhlis.atlassian.net/jira/software/projects/TA)
-[Figma](https://www.figma.com/design/X6KnqKAUaMH9SkCAjtHukb/Untitled?node-id=0-1&t=5odGkhgraohIjV42-1)



