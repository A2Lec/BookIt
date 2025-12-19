# BookIt Backend

NestJS + Prisma + PostgreSQL

## Setup local

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

## Variables d'environnement

Voir `.env.example`:
- `DATABASE_URL` — Postgres URI
- `JWT_SECRET` — Secret pour tokens JWT

## API Endpoints

### Auth
```
POST /auth/register
{ email, password, firstName?, lastName? }

POST /auth/login
{ email, password }
```

### Resources
```
GET /resources?skip=0&take=20
POST /resources
{ name, description?, category, capacity?, features?, location?, status, requiresApproval? }

GET /resources/:id
PUT /resources/:id
DELETE /resources/:id
```

### Bookings
```
GET /bookings?skip=0&take=20
POST /bookings
{ resourceId, userId, startTime, endTime, title, notes?, isRecurring?, recurrenceRule? }

GET /bookings/today
GET /bookings/user/:userId
GET /bookings/:id
PUT /bookings/:id
DELETE /bookings/:id
```

### Users
```
GET /users/:id
GET /users/me (avec x-user-id header)
```

## À faire
- JWT Guard middleware
- Permissions (role-based)
- Seed data
- Validation DTOs
- Error handling middleware
- Logger
- Socket.io gateway

