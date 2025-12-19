# BookIt Frontend

React 18 + TypeScript + Tailwind CSS + Vite

## Setup local

```bash
npm install
npm run dev
```

Accès: http://localhost:5173

## Pages

- `/login` — Connexion / Inscription
- `/` — Dashboard (réservations du jour, stats)
- `/resources` — CRUD ressources
- `/calendar` — Calendrier avec création de réservations
- `/my-bookings` — Mes réservations (annulation)

## Styles

Tailwind CSS + composants custom. Palette:
- Bleu primaire: `#2563eb` (blue-600)
- Vert pour confirmations: `#16a34a` (green-600)
- Gris neutre: Tailwind grays

## À faire
- React Query pour cache
- Zustand store (auth)
- JWT interceptor axios
- Dates avec date-fns
- Forms React Hook Form + Zod
- Calendar library (FullCalendar ou React Big Calendar)
- Socket.io client
- Notifications badge
- Responsive mobile
- Dark mode

