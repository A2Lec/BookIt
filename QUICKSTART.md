# 🚀 Guide Démarrage Rapide - BookIt

## ⚡ Lancer l'Application en 2 Minutes

### Étape 1: Installer les dépendances

```bash
cd frontend
npm install
```

### Étape 2: Lancer le serveur de développement

```bash
npm run dev
```

**✅ L'app est maintenant disponible à:** http://localhost:5173

---

## 🔐 Se Connecter

L'application dispose de 3 comptes de test déjà préchargés:

### Compte Admin
- **Email:** admin@test.fr
- **Password:** test123

### Compte Manager
- **Email:** manager@test.fr
- **Password:** test123

### Compte Utilisateur
- **Email:** user@test.fr
- **Password:** test123

> Les emails et mots de passe s'affichent directement dans la page de connexion pour faciliter les tests.

---

## 🎯 Testez le Flux Complet

1. **Login** → Cliquez sur l'onglet "Connexion" et entrez l'un des comptes ci-dessus
2. **Dashboard** → Voyez les statistiques et vos réservations du jour
3. **Resources** → Consultez les 4 ressources disponibles ou en ajoutez une nouvelle
4. **Calendar** → Cliquez sur une date pour créer une réservation
5. **MyBookings** → Consultez et annulez vos réservations
6. **Notifications** → Consultez votre historique de notifications

---

## 📁 Structure des Fichiers Importants

```
frontend/src/
├── pages/                    # 6 pages principales
│   ├── Login.tsx            # Authentification
│   ├── Dashboard.tsx        # Statistiques & bookings du jour
│   ├── Resources.tsx        # Gestion des ressources
│   ├── Calendar.tsx         # Vue mensuelle & création bookings
│   ├── MyBookings.tsx       # Mes réservations
│   └── Notifications.tsx    # Notifications
│
├── store/                   # État management (Zustand)
│   ├── authStore.ts         # Auth state + localStorage
│   ├── bookingsStore.ts     # Bookings + détection conflits
│   └── resourcesStore.ts    # Resources CRUD
│
├── lib/
│   └── mockData.ts          # Données simulées
│
└── App.tsx                  # Router + layout principal
```

---

## 🎨 Ce Qui Est Fonctionnel

✅ **Authentification** — Login/Register avec mock users  
✅ **Dashboard** — Stats et bookings du jour  
✅ **Ressources** — Ajouter, voir les ressources  
✅ **Calendrier** — Vue mensuelle, créer bookings  
✅ **Réservations** — Voir et annuler ses bookings  
✅ **Notifications** — Voir, marquer comme lu, supprimer  
✅ **Détection de conflits** — Vérif auto des créneau chevauchants  
✅ **Persistance** — Données sauvegardées via localStorage  

---

## ⚙️ Données Mock

Les données sont **simulées localement** et stockées avec:
- **Zustand** — State management
- **localStorage** — Persistance des données

Aucune base de données n'est nécessaire pour le développement.

---

## 📦 Dépendances Principales

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "tailwindcss": "^3.x"
}
```

---

## 🔧 Troubleshooting

**Problème:** La page de login n'affiche pas les comptes de test  
**Solution:** Vérifiez que `frontend/src/lib/mockData.ts` existe

**Problème:** Les données ne persistent pas au rechargement  
**Solution:** Vérifiez que localStorage est activé dans le navigateur

**Problème:** Les styles Tailwind ne s'appliquent pas  
**Solution:** Redémarrez le serveur (`npm run dev`)

---

## 📝 Prochaines Étapes

- [ ] Connecter le backend NestJS (quand la DB sera prête)
- [ ] Remplacer Zustand par React Query
- [ ] Ajouter les tests unitaires
- [ ] Implémenter Socket.io pour les mises à jour en temps réel
- [ ] Ajouter les permissions par rôle (RBAC)

---

## 💡 Tips de Développement

### Ajouter une nouvelle page
1. Créer `frontend/src/pages/NewPage.tsx`
2. Importer dans `App.tsx`
3. Ajouter la route
4. Ajouter le lien dans la navigation

### Ajouter un nouveau store Zustand
1. Créer `frontend/src/store/newStore.ts`
2. Exporter le hook `useNewStore`
3. Utiliser dans les composants: `const data = useNewStore((state) => state.data)`

### Ajouter des données mock
1. Modifier `frontend/src/lib/mockData.ts`
2. Ajouter l'export
3. Importer dans le store approprié

---

**Bienvenue sur BookIt! 📅✨**

Pour toute question, consultez le [README.md](./README.md)
