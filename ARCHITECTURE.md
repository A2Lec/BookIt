# 🏗️ Architecture BookIt

## Vue d'Ensemble

BookIt est une plateforme SaaS de réservation de ressources construite avec:
- **Frontend** → React 18 + TypeScript + Tailwind + Zustand
- **Backend** → NestJS (API préparée, pas encore connectée)
- **Data** → Mock data en local (localStorage)
- **Auth** → JWT tokens simulés

### Diagramme de Flux

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  App.tsx (Router + Auth Guard)                            │
│      ↓                                                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Routes Protégées (nécessite login)                 │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ • Dashboard (/dashboard)                           │  │
│  │ • Resources (/resources)                           │  │
│  │ • Calendar (/calendar)                             │  │
│  │ • MyBookings (/my-bookings)                        │  │
│  │ • Notifications (/notifications)                   │  │
│  └─────────────────────────────────────────────────────┘  │
│      ↓                                                      │
│  Zustand Stores (State Management)                        │
│  ├─ authStore → User, Token, isAuthenticated()           │
│  ├─ bookingsStore → Bookings, hasConflict(), add/remove  │
│  └─ resourcesStore → Resources, add/update/remove        │
│      ↓                                                      │
│  localStorage (Persistence)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    MOCK DATA (Local)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  mockData.ts                                              │
│  ├─ mockUsers (3 users: admin, manager, user)            │
│  ├─ mockResources (4 resources: rooms, vehicle, equipment)│
│  ├─ mockBookings (2 bookings)                             │
│  ├─ mockDepartments (2 departments)                       │
│  └─ mockNotifications (notifications)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Prepared)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NestJS Modules (non actifs pour le moment)              │
│  ├─ AuthModule → JWT, Register, Login                    │
│  ├─ UsersModule → User CRUD                              │
│  ├─ ResourcesModule → Resource CRUD                      │
│  └─ BookingsModule → Booking CRUD, Conflict Detection    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL - Future)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Prisma Schema Defined:                                   │
│  ├─ User                                                  │
│  ├─ Department                                            │
│  ├─ Resource                                              │
│  ├─ Booking                                               │
│  ├─ Notification                                          │
│  └─ Review                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 Structure Détaillée

### Frontend (`frontend/src/`)

#### Pages
```
pages/
├── Login.tsx
│   ├─ Render: Form + Test Accounts
│   ├─ Logic: useAuthStore.setAuth()
│   └─ Auth: Mock JWT generation
│
├── Dashboard.tsx
│   ├─ Render: Stats cards + Booking lists
│   ├─ Data: useBookingsStore, useResourcesStore
│   └─ Logic: getTodayBookings(), filter by date
│
├── Resources.tsx
│   ├─ Render: Resource grid + Add form
│   ├─ Data: useResourcesStore
│   └─ Logic: addResource(), filterByCategory()
│
├── Calendar.tsx
│   ├─ Render: Month grid + Booking modal
│   ├─ Data: useBookingsStore, useResourcesStore
│   └─ Logic: handleCreateBooking(), hasConflict()
│
├── MyBookings.tsx
│   ├─ Render: Booking list + Cancel button
│   ├─ Data: useBookingsStore, useAuthStore
│   └─ Logic: removeBooking(), confirmDialog()
│
└── Notifications.tsx
    ├─ Render: Notification list + Filters
    ├─ Data: mockNotifications filtered by userId
    └─ Logic: markAsRead(), delete(), filter
```

#### State Management (`store/`)
```
store/
├── authStore.ts
│   ├─ State: { user, token, loading, error }
│   ├─ Actions: setAuth(), logout(), isAuthenticated()
│   └─ Persistence: localStorage sync
│
├── bookingsStore.ts
│   ├─ State: { bookings, loading, error }
│   ├─ Actions: addBooking(), removeBooking(), updateBooking()
│   ├─ Helpers: hasConflict(), getTodayBookings(), getBookingsByUser()
│   └─ Conflict Logic: 
│   │   - Compares startTime/endTime overlaps
│   │   - Excludes CANCELLED bookings
│   │   - Returns boolean
│   └─ Persistence: localStorage sync
│
└── resourcesStore.ts
    ├─ State: { resources, loading, error }
    ├─ Actions: addResource(), updateResource(), removeResource()
    ├─ Helpers: filterByCategory(), getById()
    └─ Persistence: localStorage sync
```

#### Utilities (`lib/`)
```
lib/
└── mockData.ts
    ├─ mockUsers: [{ id, name, email, role, department_id }]
    ├─ mockResources: [{ id, name, category, status, department_id }]
    ├─ mockBookings: [{ id, title, resource_id, user_id, startTime, endTime, status }]
    ├─ mockDepartments: [{ id, name }]
    └─ mockNotifications: [{ id, userId, type, message, isRead, createdAt }]
```

#### Main Files
```
├── App.tsx
│   ├─ Routes: { /login, /, /resources, /calendar, /my-bookings, /notifications }
│   ├─ Navigation: Header with links + user info
│   ├─ Auth Guard: ProtectedRoute component
│   └─ Logout: handleLogout() → localStorage.clear()
│
├── main.tsx
│   └─ Entry point: React.createRoot()
│
└── styles.css
    └─ Global Tailwind imports
```

### Backend (`backend/src/`) — Prepared, not active

```
backend/src/
├── auth/
│   ├─ auth.module.ts
│   ├─ auth.controller.ts
│   ├─ auth.service.ts
│   ├─ jwt.strategy.ts
│   └─ login.dto.ts
│
├── users/
│   ├─ users.module.ts
│   ├─ users.controller.ts
│   ├─ users.service.ts
│   └─ user.entity.ts
│
├── resources/
│   ├─ resources.module.ts
│   ├─ resources.controller.ts
│   ├─ resources.service.ts
│   └─ resource.entity.ts
│
└── bookings/
    ├─ bookings.module.ts
    ├─ bookings.controller.ts
    ├─ bookings.service.ts
    │   └─ detectConflict() — similar logic
    └─ booking.entity.ts
```

### Database Schema (`backend/prisma/schema.prisma`)

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String
  role      Role      @default(USER)
  departmentId String
  department Department @relation(fields: [departmentId], references: [id])
  bookings  Booking[]
  notifications Notification[]
}

model Resource {
  id        String    @id @default(cuid())
  name      String
  category  ResourceCategory
  status    ResourceStatus @default(AVAILABLE)
  departmentId String
  department Department @relation(fields: [departmentId], references: [id])
  bookings  Booking[]
}

model Booking {
  id        String    @id @default(cuid())
  title     String
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  resourceId String
  resource  Resource  @relation(fields: [resourceId], references: [id])
  startTime DateTime
  endTime   DateTime
  status    BookingStatus @default(PENDING)
}

model Notification {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  type      NotificationType
  message   String
  isRead    Boolean   @default(false)
  createdAt DateTime  @default(now())
}

model Department {
  id        String    @id @default(cuid())
  name      String
  users     User[]
  resources Resource[]
}
```

---

## 🔄 Flux de Données

### Création d'une Réservation

```
1. User clicks date on Calendar
2. Modal form opens (resource, title, startTime, endTime)
3. User submits form
4. handleCreateBooking() validates:
   - All fields required
   - Check hasConflict(resourceId, startTime, endTime)
   - If conflict: show error message
   - If OK: bookingsStore.addBooking()
5. Store action:
   - Add booking to state
   - Update localStorage
   - Trigger re-render
6. Calendar updates with new booking
7. Booking appears on Dashboard & MyBookings
```

### Détection de Conflits

```typescript
hasConflict(resourceId, startTime, endTime) {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  
  return bookings.some(booking => {
    // Skip if different resource
    if (booking.resourceId !== resourceId) return false
    
    // Skip if booking is cancelled
    if (booking.status === 'CANCELLED') return false
    
    // Check time overlap
    const bStart = new Date(booking.startTime).getTime()
    const bEnd = new Date(booking.endTime).getTime()
    
    // Conflict if: new starts before existing ends AND
    //             new ends after existing starts
    return bStart < end && bEnd > start
  })
}
```

### Authentification

```
1. User enters email & password on Login page
2. Click "Connexion"
3. Mock lookup in mockUsers array
4. If found:
   - Generate mock JWT token: btoa(JSON.stringify({userId, email}))
   - Call authStore.setAuth(user, token)
5. Store action:
   - Save user to Zustand state
   - Save token to localStorage
   - Trigger re-render
6. App redirects to Dashboard
7. ProtectedRoute checks isAuthenticated() → checks token in state
```

---

## 💾 Persistance des Données

### localStorage Structure

```json
{
  "auth_store": {
    "state": {
      "user": { "id", "name", "email", "role" },
      "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
    }
  },
  "bookings_store": {
    "state": {
      "bookings": [{ "id", "title", "userId", "resourceId", ... }]
    }
  },
  "resources_store": {
    "state": {
      "resources": [{ "id", "name", "category", "status" }]
    }
  }
}
```

### Zustand Persistence Pattern

```typescript
// Auto-sync to localStorage via getStorage().setItem()
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  
  setAuth: (user, token) => set({ user, token }),
  
  // Load from localStorage on app init
  loadFromStorage: () => {
    const stored = localStorage.getItem('auth_store')
    if (stored) {
      const { user, token } = JSON.parse(stored)
      set({ user, token })
    }
  }
}))
```

---

## 🔐 Sécurité

### Current (Development)
- ⚠️ Mock authentication (tokens generated client-side)
- ⚠️ No password hashing
- ⚠️ No rate limiting
- ⚠️ All data in localStorage (not secure for sensitive data)

### Future (Production)
- 🔒 Backend JWT validation
- 🔒 Password hashing (bcrypt)
- 🔒 HTTPS only
- 🔒 CORS configuration
- 🔒 Rate limiting + brute force protection
- 🔒 Secure httpOnly cookies (vs localStorage)
- 🔒 CSRF tokens
- 🔒 Role-based access control (RBAC)

---

## 🚀 Migration vers Backend

### Étape 1: Ajouter React Query

```bash
npm install @tanstack/react-query axios
```

### Étape 2: Créer API Hooks

```typescript
// hooks/useBookings.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useBookings = () => {
  const queryClient = useQueryClient()
  
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => axios.get('/api/bookings').then(r => r.data)
  })
}
```

### Étape 3: Remplacer Zustand par React Query

```typescript
// Avant (Zustand)
const bookings = useBookingsStore(state => state.bookings)

// Après (React Query)
const { data: bookings } = useBookings()
```

### Étape 4: Lancer Backend + DB

```bash
docker compose up postgres
cd backend && npm run dev
```

---

## 📈 Scalabilité

### Optimizations Planifiées
- [ ] Code splitting (React.lazy)
- [ ] Image optimization
- [ ] Caching strategy (Service Worker)
- [ ] Database indexing (Booking by userId, resourceId, startTime)
- [ ] Pagination (large booking lists)
- [ ] Virtual scrolling (calendar with many bookings)

### Performance Actuelle
- ⚡ No API calls (all local)
- ⚡ Instant updates (no network latency)
- ⚡ Small bundle size (~200KB)
- ⚡ React.memo optimization ready

---

## 🔗 Intégrations Futures

- 📧 Email notifications (sendgrid)
- 📱 SMS reminders (twilio)
- 🔔 Push notifications (firebase)
- 🗓️ Calendar sync (google calendar, outlook)
- 💳 Payment processing (stripe)
- 📊 Analytics (mixpanel, amplitude)
- 🔐 SSO (google, github, microsoft)

---

## 📚 Ressources Utiles

- [React Docs](https://react.dev)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Router v6](https://reactrouter.com)

---

**Architecture BookIt v1.0 📅✨**
