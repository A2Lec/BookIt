# 📅 BookIt - SaaS de Réservation de Ressources

Une plateforme complète de gestion de réservations de ressources (salles, équipements, véhicules) pour entreprises, construite avec NestJS, React, et Tailwind CSS.

## 🎯 Fonctionnalités

✅ **Authentification** — Connexion/Inscription avec test accounts  
✅ **Dashboard** — Tableau de bord avec statistiques et réservations du jour  
✅ **Gestion des Ressources** — Ajouter, modifier, supprimer des ressources  
✅ **Calendrier** — Vue mensuelle avec création de réservations  
✅ **Réservations** — Consulter, créer, annuler ses réservations  
✅ **Détection de Conflits** — Vérification automatique des créneau chevauchants  
✅ **Notifications** — Système de notifications pour l'utilisateur  
✅ **Mode Mock** — Données simulées en local, sans base de données

## 🏗️ Architecture

```
BookIt/
├── backend/                 # NestJS API (préparé, pas de DB)
│   ├── src/
│   │   ├── auth/           # Module authentification
│   │   ├── users/          # Module utilisateurs
│   │   ├── resources/      # Module ressources
│   │   └── bookings/       # Module réservations
│   └── prisma/
│       └── schema.prisma   # Schéma de données
│
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── pages/          # Pages (Login, Dashboard, Resources, Calendar, MyBookings, Notifications)
│   │   ├── store/          # Zustand stores (authStore, bookingsStore, resourcesStore)
│   │   └── lib/
│   │       └── mockData.ts # Données simulées
│   └── tailwind.config.js  # Configuration Tailwind CSS
│
└── docker-compose.yml      # Orchestration Docker (optionnel)
```

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** >= 18
- **npm** ou **yarn**
- **Visual Studio Code** (recommandé)

### 1️⃣ Installation des dépendances

```bash
# Frontend
cd frontend
npm install

# Backend (optionnel - pas de DB pour le moment)
cd ../backend
npm install
```

### 2️⃣ Démarrage du Frontend

```bash
cd frontend
npm run dev
```

La plateforme sera accessible à: **http://localhost:5173**

### 3️⃣ Comptes de Test

Utilisez ces identifiants pour tester l'application:

| Email | Rôle | Mot de passe |
|-------|------|--------------|
| admin@test.fr | ADMIN | test123 |
| manager@test.fr | MANAGER | test123 |
| user@test.fr | USER | test123 |

## 📱 Pages et Fonctionnalités

### 🔐 Login (`/login`)
- Formulaire d'authentification
- Enregistrement d'utilisateurs
- Affichage des comptes de test disponibles
- Authentification mock avec génération de token JWT

### 📊 Dashboard (`/`)
- Statistiques (nombre de réservations, ressources occupées/disponibles)
- Réservations du jour
- Réservations des 7 prochains jours

### 🛠️ Ressources (`/resources`)
- Grille de ressources par catégorie
- Formulaire d'ajout de ressource
- Affichage du statut (AVAILABLE, IN_USE, MAINTENANCE)
- Filtrage par catégorie

### 📅 Calendrier (`/calendar`)
- Vue mensuelle interactive
- Affichage des réservations par jour
- Création de réservation en cliquant une date
- Détection automatique des conflits
- Navigation entre les mois

### 📝 Mes Réservations (`/my-bookings`)
- Liste des réservations de l'utilisateur
- Détails (ressource, date/heure, statut)
- Bouton d'annulation avec confirmation
- Filtrage par statut

### 🔔 Notifications (`/notifications`)
- Historique des notifications
- Filtrage (toutes / non lues)
- Marquage comme lu
- Suppression

## 💾 Gestion des Données

L'application utilise **Zustand** pour la gestion d'état avec persistance localStorage:

- **authStore** — Utilisateur connecté, token JWT
- **bookingsStore** — Réservations avec détection de conflits
- **resourcesStore** — Ressources et catégories

Les données sont simulées via `lib/mockData.ts` et persisteront via localStorage.

## 🔄 Flux d'Utilisation Principal

1. **Login** → Choisir un compte de test
2. **Dashboard** → Voir statistiques et bookings du jour
3. **Resources** → Parcourir les ressources disponibles
4. **Calendar** → Cliquer une date et créer une réservation
5. **MyBookings** → Voir ses réservations et pouvoir les annuler
6. **Notifications** → Consulter les notifications

## 📦 Commandes Utiles

```bash
# Frontend
npm run dev          # Démarrage en développement
npm run build        # Build pour production
npm run preview      # Aperçu du build
npm run lint         # Vérifier TypeScript

# Backend (quand la DB sera prête)
npm run start        # Démarrage
npm run dev          # Mode développement
```

## 🗄️ Configuration Base de Données (Futur)

Le schéma Prisma est déjà préparé dans `backend/prisma/schema.prisma`.

Pour configurer la DB PostgreSQL:

```bash
# Migration des schémas
npx prisma migrate dev --name init

# Génération du client Prisma
npx prisma generate
```

## 🐳 Docker (Optionnel)

```bash
# Démarrer tous les services (backend + frontend + postgres)
docker compose up -d

# Arrêter
docker compose down
```

## 🎨 Stack Technologique

### Frontend
- **React 18** — UI framework
- **TypeScript** — Typage statique
- **Vite** — Build tool haute performance
- **Tailwind CSS** — Utility-first CSS
- **Zustand** — État management minimaliste
- **React Router v6** — Navigation

### Backend
- **NestJS 10** — Framework Node.js
- **Prisma 5** — ORM
- **PostgreSQL** — Base de données
- **JWT** — Authentification

## 📝 Notes

- Actuellement en mode **MOCK DATA** (pas de base de données)
- L'authentification est simulée côté frontend
- Les réservations sont stockées dans Zustand + localStorage
- La détection de conflits fonctionne localement
- À l'avenir: connexion à l'API NestJS + PostgreSQL

## 🔄 Prochaines Étapes

1. Intégrer le backend NestJS avec PostgreSQL
2. Remplacer Zustand par React Query + API appels
3. Ajouter Socket.io pour les mises à jour temps réel
4. Implémenter le contrôle d'accès basé sur les rôles (RBAC)
5. Ajouter des tests automatisés
6. Déployer sur un serveur de production

## 📧 Contact & Support

Pour des questions ou des améliorations, veuillez créer une issue sur le dépôt.

---

**Bon booking! 📅✨**
│   ├── prisma/              # Migrations Prisma
│   ├── src/
│   │   ├── auth/            # Modules auth (register, login, JWT)
│   │   ├── users/           # Service utilisateurs
│   │   ├── resources/       # CRUD ressources
│   │   ├── bookings/        # Réservations + vérif conflits
│   │   └── prisma/          # Wrapper Prisma
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # Login, Dashboard, Resources, Calendar, MyBookings
│   │   ├── App.tsx          # Routes
│   │   └── styles.css       # Tailwind
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Comptes test

À créer via `/auth/register`:
- Email: `admin@test.fr` / Mot de passe: `admin123`
- Email: `user@test.fr` / Mot de passe: `user123`

## APIs principales

### Auth
- `POST /auth/register` — Inscription
- `POST /auth/login` — Connexion

### Resources
- `GET /resources` — Lister
- `POST /resources` — Créer
- `GET /resources/:id` — Détail
- `PUT /resources/:id` — Modifier
- `DELETE /resources/:id` — Supprimer

### Bookings
- `GET /bookings` — Lister
- `POST /bookings` — Créer (vérif auto conflits)
- `GET /bookings/today` — Du jour
- `GET /bookings/user/:userId` — De l'utilisateur
- `PUT /bookings/:id` — Modifier
- `DELETE /bookings/:id` — Annuler

## Prochaines étapes
- [ ] Authentification par JWT guard
- [ ] Socket.io pour mises à jour temps réel
- [ ] Permissions (Admin/Manager/User)
- [ ] Notifications internes
- [ ] Récurrence des réservations (rrule)
- [ ] Upload images
- [ ] Tests unitaires
- [ ] Dark mode
- [ ] Postman collection

## Développement

Voir `backend/README.md` et `frontend/` pour détails spécifiques.

