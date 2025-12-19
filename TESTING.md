# ✅ Testing Checklist - BookIt

## 🎯 Pre-Launch Verification

### Environment Setup
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Frontend dependencies installed (`npm install` in `frontend/`)
- [ ] No TypeScript errors in IDE
- [ ] Tailwind CSS configured correctly
- [ ] localStorage enabled in browser

### Dev Server
- [ ] `npm run dev` runs without errors
- [ ] App loads on http://localhost:5173
- [ ] No console errors on page load
- [ ] Navigation header displays correctly

---

## 🔐 Authentication Tests

### Login Functionality
- [ ] Login page displays correctly
- [ ] Test accounts are shown in the form hints
- [ ] Can login with `admin@test.fr` / `test123`
- [ ] Can login with `manager@test.fr` / `test123`
- [ ] Can login with `user@test.fr` / `test123`
- [ ] Invalid email shows error message
- [ ] Invalid password shows error message
- [ ] After login, redirects to Dashboard
- [ ] User name displays in header
- [ ] Token stored in localStorage

### Authentication Guard
- [ ] Cannot access `/resources` without login (redirects to /login)
- [ ] Cannot access `/calendar` without login (redirects to /login)
- [ ] Cannot access `/my-bookings` without login (redirects to /login)
- [ ] Cannot access `/notifications` without login (redirects to /login)
- [ ] Can access `/login` without authentication
- [ ] Logout button appears in header when logged in

### Logout
- [ ] Logout button visible in header
- [ ] Click logout → redirects to /login
- [ ] Token removed from localStorage
- [ ] User info cleared from state
- [ ] Cannot access protected pages after logout

---

## 📊 Dashboard Tests

### Page Load
- [ ] Dashboard loads without errors
- [ ] Shows "📊 Dashboard" title
- [ ] Navigation links all visible

### Statistics Display
- [ ] Stat card 1: Total bookings count correct
- [ ] Stat card 2: Occupied resources count correct
- [ ] Stat card 3: Available resources count correct
- [ ] Cards have gradient colors
- [ ] Numbers update when bookings change

### Today's Bookings Section
- [ ] "📅 Réservations du jour" title displays
- [ ] Shows bookings with today's date
- [ ] Each booking shows: resource name, time, status
- [ ] Empty state if no bookings today
- [ ] Click booking shows details

### Next 7 Days Bookings
- [ ] "📅 Réservations des 7 prochains jours" section displays
- [ ] Lists all bookings in next 7 days
- [ ] Sorted by date/time
- [ ] Shows dates correctly

---

## 🛠️ Resources Tests

### Page Load
- [ ] Resources page loads correctly
- [ ] "🛠️ Ressources" title displays
- [ ] 4 mock resources visible in grid

### Resource Display
- [ ] Resource name displays
- [ ] Category emoji displays (🏢 room, 🚗 vehicle, 🖥️ equipment)
- [ ] Status badge displays (colors: green/yellow/red)
- [ ] Resource cards are responsive (3 cols on desktop)

### Add Resource Form
- [ ] "Ajouter une ressource" button visible
- [ ] Click button → form modal opens
- [ ] Form has fields: name, category, status
- [ ] Submit without name → shows error
- [ ] Submit with valid data → adds to list
- [ ] New resource appears in grid immediately
- [ ] Data persists after page reload (localStorage)

### Category Filter
- [ ] Can filter by category
- [ ] Grid updates when filter changes
- [ ] Shows correct count per category

---

## 📅 Calendar Tests

### Page Load
- [ ] Calendar page loads without errors
- [ ] "📅 Calendrier" title displays
- [ ] Current month name displays (e.g., "Janvier 2024")

### Month Navigation
- [ ] "← Précédent" button works
- [ ] "Suivant →" button works
- [ ] Month name updates when navigating
- [ ] Days update correctly for each month
- [ ] Can navigate multiple months forward/backward

### Calendar Grid
- [ ] Calendar displays 7 columns (Mon-Sun)
- [ ] Day numbers 1-28/29/30/31 display
- [ ] Today's date highlighted in blue
- [ ] Previous/next month days grayed out
- [ ] Grid responsive on mobile

### Booking Display in Calendar
- [ ] Bookings show as small cards in day cells
- [ ] "+" indicator when >2 bookings in a day
- [ ] Booking colors match category

### Create Booking
- [ ] Click on date → modal opens
- [ ] Modal has fields: resource, title, startTime, endTime
- [ ] All fields are required
- [ ] Can select resource from dropdown
- [ ] Date/time inputs work correctly
- [ ] Submit with valid data → booking created
- [ ] Booking appears in calendar immediately
- [ ] New booking appears on Dashboard

### Conflict Detection
- [ ] Create booking 2024-01-15, 10:00-11:00 in "Salle A"
- [ ] Try to create overlapping: 2024-01-15, 10:30-11:30 in "Salle A"
- [ ] Shows error: "Cette ressource est déjà réservée pendant cette période"
- [ ] Can create non-overlapping booking in same resource
- [ ] Can create overlapping booking in different resource

---

## 📝 MyBookings Tests

### Page Load
- [ ] MyBookings page loads correctly
- [ ] "📝 Mes réservations" title displays

### Booking List
- [ ] All user's bookings displayed
- [ ] Other users' bookings NOT shown
- [ ] Each booking shows: resource, date, time, status
- [ ] Empty state if user has no bookings

### Cancel Booking
- [ ] Cancel button visible on each booking
- [ ] Click cancel → confirmation dialog appears
- [ ] "Confirmer l'annulation?" message shows
- [ ] Click "Oui" → booking removed
- [ ] Booking disappears from list immediately
- [ ] Booking removed from Dashboard
- [ ] Booking slot available again in Calendar
- [ ] Can create new booking in previously conflicting time

### Status Display
- [ ] Booking status badge shows (PENDING, CONFIRMED, CANCELLED)
- [ ] Cancelled bookings show differently
- [ ] Cannot cancel already cancelled booking

---

## 🔔 Notifications Tests

### Page Load
- [ ] Notifications page loads correctly
- [ ] "🔔 Notifications" title displays

### Notification List
- [ ] All user's notifications displayed
- [ ] Notifications show: icon, message, timestamp
- [ ] Unread notifications have different styling

### Filter Buttons
- [ ] "Toutes (X)" button shows all notifications
- [ ] "Non lues (X)" button shows only unread
- [ ] Unread count updates correctly

### Mark as Read
- [ ] "Marquer comme lu" button on unread notifications
- [ ] Click → notification marked as read
- [ ] Styling changes (not bold anymore)
- [ ] Unread count decreases

### Delete Notification
- [ ] "Supprimer" button removes notification
- [ ] Notification disappears from list
- [ ] Count updates

### Mark All as Read
- [ ] "Marquer tout comme lu" button when unread exist
- [ ] Click → all notifications marked as read
- [ ] All styling updates
- [ ] Unread count → 0

---

## 🔄 Cross-Page Integration Tests

### Complete User Flow
1. [ ] Login with `user@test.fr`
2. [ ] Dashboard shows empty/sample data
3. [ ] Navigate to Resources → add new resource
4. [ ] Navigate to Calendar → create booking on today
5. [ ] Booking appears on Dashboard "Aujourd'hui"
6. [ ] Navigate to MyBookings → booking visible
7. [ ] Click cancel → confirm → booking gone
8. [ ] Booking slot available again in Calendar
9. [ ] Navigate to Notifications → see booking notifications
10. [ ] Logout → redirected to login

### Data Persistence
- [ ] Login → create booking → refresh page → booking still there
- [ ] Add resource → refresh page → resource still there
- [ ] Logout → clear all data from state
- [ ] Login again → data restored from localStorage

### Navigation
- [ ] All nav links work from every page
- [ ] Header always visible and accessible
- [ ] Active page highlighted in navigation (optional)
- [ ] Logo/title clickable (goes to Dashboard if logged in)

---

## 🎨 UI/UX Tests

### Visual Consistency
- [ ] Colors consistent across pages
- [ ] Buttons same style everywhere
- [ ] Forms have consistent styling
- [ ] Spacing/padding looks balanced

### Responsiveness
- [ ] Desktop (1920px) — 3 column grids display correctly
- [ ] Tablet (768px) — 2 column grids display correctly
- [ ] Mobile (375px) — 1 column grids display correctly
- [ ] No horizontal scrolling on mobile

### Accessibility
- [ ] Can tab through all interactive elements
- [ ] Focus visible on buttons/inputs
- [ ] Form labels associated with inputs
- [ ] Error messages clear and visible
- [ ] Emojis don't interfere with text readability

### Loading States
- [ ] Forms show loading state during submission (simulated)
- [ ] No data loss if clicking fast
- [ ] Proper error boundaries if state fails

---

## 🐛 Error Handling Tests

### Form Validation
- [ ] Submit empty form → error messages
- [ ] Submit with invalid email → error
- [ ] Submit with mismatched passwords → error
- [ ] Clear form → resets validation

### Edge Cases
- [ ] Create booking with 1-second duration → works
- [ ] Create booking with end time before start → error
- [ ] Delete booking that's already deleted → handles gracefully
- [ ] Navigate while offline → works (mock data)

### Data Integrity
- [ ] Delete resource → remove from all bookings? (check logic)
- [ ] Update resource → bookings still reference correctly
- [ ] Clear localStorage → app still loads with defaults

---

## 📊 Performance Tests

### Load Time
- [ ] Page loads in < 2 seconds
- [ ] No jank when scrolling
- [ ] Smooth transitions/animations
- [ ] No memory leaks (check DevTools)

### Responsiveness
- [ ] Buttons respond immediately to clicks
- [ ] Forms submit without lag
- [ ] Filtering happens instantly

---

## 🚀 Final Verification

### Before Deployment
- [ ] All pages tested
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All links work
- [ ] Data persists correctly
- [ ] Authentication works
- [ ] Responsive on mobile
- [ ] Accessible with keyboard
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)

### Documentation
- [ ] README.md is accurate
- [ ] QUICKSTART.md works
- [ ] ARCHITECTURE.md describes current state
- [ ] Code comments present where needed

---

## 📝 Sign-Off

- [ ] All tests passed
- [ ] Ready for staging/production
- [ ] User feedback gathered (if applicable)
- [ ] Known issues documented (if any)

---

**Testing Complete! ✅📅**

Use this checklist to verify BookIt works as expected before each release.
