# 🛠️ Dev Environment Setup - BookIt

## ✅ Pre-Requisites Checklist

### System Requirements
- [ ] Windows 10/11 (or Mac/Linux)
- [ ] At least 2GB free disk space
- [ ] Good internet connection (for npm install)

### Required Software
- [ ] **Node.js** >= 18.0.0 → [Download](https://nodejs.org/)
- [ ] **npm** >= 9.0.0 (comes with Node.js)
- [ ] **Git** (recommended) → [Download](https://git-scm.com/)
- [ ] **VSCode** (recommended) → [Download](https://code.visualstudio.com/)

### Verify Installation

Open Terminal/PowerShell and run:

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 9.x.x or higher
```

---

## 📥 Installation Steps

### 1. Navigate to Frontend

```bash
cd Saas/frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will:
- Download React, Vite, Tailwind, Zustand, React Router
- Create `node_modules/` folder (~300MB)
- Create `package-lock.json`
- Takes ~2-5 minutes depending on internet

### 3. Start Development Server

```bash
npm run dev
```

Output should show:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Press q to quit
```

### 4. Open Browser

Navigate to: **http://localhost:5173**

You should see the BookIt login page! 🎉

---

## 🎯 VSCode Extensions (Optional but Recommended)

Install these extensions for better development experience:

### Must-Have
- [ ] **ES7+ React/Redux/React-Native snippets**
  - ID: `dsznajder.es7-react-js-snippets`
  - Quick React component creation

- [ ] **Tailwind CSS IntelliSense**
  - ID: `bradlc.vscode-tailwindcss`
  - Autocomplete for Tailwind classes

- [ ] **Prettier - Code formatter**
  - ID: `esbenp.prettier-vscode`
  - Auto-format code on save

### Nice-to-Have
- [ ] **Thunder Client** or **REST Client**
  - For testing APIs later
  
- [ ] **React DevTools**
  - Browser extension for React debugging
  - ID: `react-devtools`

- [ ] **Zustand DevTools**
  - Browser extension for state debugging

### Install Extensions
```bash
# Or install directly from VSCode Extensions panel (Ctrl+Shift+X)
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
```

---

## 🔧 VSCode Settings (Recommended)

Create or update `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTypescriptSdk": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 📂 Folder Structure in VSCode

Open `Saas` folder:

```bash
code Saas
```

Should see:

```
Saas/
├── frontend/
│   ├── src/
│   │   ├── pages/        ← Edit here (UI components)
│   │   ├── store/        ← Edit here (state management)
│   │   ├── lib/          ← Edit here (mock data)
│   │   └── App.tsx       ← Edit here (routing)
│   ├── node_modules/     ← Don't edit (auto-generated)
│   ├── package.json      ← Don't edit (dependencies)
│   └── vite.config.ts    ← Don't edit (build config)
│
├── backend/              ← Will use later (NestJS)
│
└── README.md             ← Read this first
```

---

## 🔄 Common Development Workflow

### Starting Development

```bash
# Terminal 1: Start dev server
cd Saas/frontend
npm run dev

# Terminal 2 (if making backend changes): Build backend
cd Saas/backend
npm run build
```

### Editing Files

1. Open file in VSCode
2. Make changes
3. Save (Ctrl+S) → auto-formatted by Prettier
4. Browser auto-reloads (HMR - Hot Module Replacement)

### Running Linter

```bash
# In frontend/ folder
npm run lint
```

### Building for Production

```bash
# In frontend/ folder
npm run build

# Output in: frontend/dist/
```

---

## 🐛 Troubleshooting

### Issue: "npm command not found"
**Solution:** Reinstall Node.js or add to PATH

### Issue: Port 5173 already in use
**Solution:** 
```bash
# Kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

Or run on different port:
```bash
npm run dev -- --port 3000
```

### Issue: "Cannot find module 'xyz'"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors in IDE
**Solution:**
- VSCode command palette (Ctrl+Shift+P)
- Type: "TypeScript: Restart TS Server"
- Press Enter

### Issue: Tailwind CSS not working
**Solution:**
- Make sure `npm run dev` is running
- Check `tailwind.config.js` exists
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

### Issue: localStorage not persisting
**Solution:**
- Check browser's Privacy settings
- Disable browser extensions that block storage
- Check if in Incognito mode (won't persist)

---

## 📚 File Navigation Tips

### Quick File Open
- VSCode: Press `Ctrl+P` then type filename
- E.g., `Ctrl+P` → type `Calendar` → Enter

### Go to Definition
- Click on component name → Press `Ctrl+Click` or `F12`
- Jump to import source

### Find All References
- Right-click function name → "Find All References"
- See where it's used

### Replace Across Files
- `Ctrl+Shift+H` → Find and replace
- E.g., find "handleBooking" replace "createBooking"

---

## 🚀 npm Scripts Reference

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking (TypeScript)
npm run lint

# Help on available scripts
npm run
```

---

## 💾 Useful Development Shortcuts

### VSCode Keyboard Shortcuts
```
Ctrl+` → Toggle terminal
Ctrl+B → Toggle explorer
Ctrl+Shift+D → Go to debugger
Ctrl+Shift+X → Go to extensions
Ctrl+K Ctrl+C → Comment line
Ctrl+/ → Toggle comment
Ctrl+Shift+L → Select all occurrences
Ctrl+H → Find and replace
Ctrl+J → Toggle panel
```

### Browser DevTools
```
F12 → Open DevTools
Ctrl+Shift+I → Open DevTools (alt)
Ctrl+Shift+J → Open console
Ctrl+Shift+C → Element picker
Ctrl+Shift+M → Mobile view
```

---

## 🔐 Environment Variables

Create `.env` files if needed:

### Frontend `.env` (Optional)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=BookIt
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### Backend `.env` (Later)
```
DATABASE_URL=postgresql://user:password@localhost:5432/bookit_dev
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
```

---

## 📊 Monitor Performance

### Check Bundle Size
```bash
npm run build
# See output size in terminal
```

### Analyze Bundle
```bash
# Install analyzer (optional)
npm install --save-dev rollup-plugin-visualizer

# Then configure in vite.config.ts
```

### Performance Profiling
- Open DevTools → Performance tab
- Click Record → do actions → Stop
- Analyze flamegraph

---

## 🔄 Update Dependencies (Advanced)

```bash
# Check for outdated packages
npm outdated

# Update all minor/patch versions
npm update

# Update specific package
npm install lodash@latest

# Interactive update
npm upgrade
```

---

## 🆘 Getting Help

### Documentation Files
- `README.md` — Project overview
- `QUICKSTART.md` — 2-minute guide
- `ARCHITECTURE.md` — Technical details
- `TESTING.md` — Testing checklist

### External Resources
- [React Docs](https://react.dev) — React guide
- [Vite Docs](https://vitejs.dev) — Build tool
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Zustand Docs](https://github.com/pmndrs/zustand) — State management
- [MDN Web Docs](https://developer.mozilla.org) — JavaScript/Web APIs

### Common Questions

**Q: How do I add a new page?**
A: Create `src/pages/NewPage.tsx`, import in `App.tsx`, add route

**Q: How do I add a new store?**
A: Create `src/store/newStore.ts`, export hook, use with `useNewStore()`

**Q: How do I add Tailwind classes?**
A: Just use them in className! E.g., `className="flex gap-4 bg-blue-500"`

**Q: How do I debug state?**
A: Use React DevTools or check localStorage in browser console

---

## ✨ Best Practices

### Code Style
- Use ES6+ features (arrow functions, destructuring, etc.)
- Use TypeScript for type safety
- Follow naming: camelCase for variables, PascalCase for components
- Keep components small and focused

### Performance
- Use React.memo for expensive components
- Use useCallback for memoized functions
- Avoid inline objects/arrays in JSX
- Use localStorage wisely (not for large data)

### File Organization
```
src/
├── pages/      → Full page components (routes)
├── components/ → Reusable components (add later)
├── store/      → Zustand stores
├── lib/        → Utilities, constants, mock data
├── hooks/      → Custom React hooks (add later)
└── types/      → TypeScript types (add later)
```

### Git Workflow (if using)
```bash
git init
git add .
git commit -m "Initial BookIt setup"
git branch -M main

# After each feature:
git add .
git commit -m "Add feature X"
git push origin main
```

---

## 🎓 Learning Path

### Week 1: Understand the Basics
1. Run `npm run dev` → See the app
2. Login with test account
3. Explore each page
4. Open DevTools → inspect elements
5. Read `ARCHITECTURE.md`

### Week 2: Make First Change
1. Edit `src/pages/Dashboard.tsx` → Change a title
2. Save → See changes in browser
3. Edit `src/lib/mockData.ts` → Add new resource
4. See changes in Resources page
5. Edit `src/store/authStore.ts` → Add new state

### Week 3: Create New Feature
1. Create new page in `src/pages/`
2. Create new store in `src/store/`
3. Add route in `App.tsx`
4. Add navigation link in header
5. Test the feature

### Week 4+: Integrate Backend
1. Start `npm run dev` in backend/
2. Replace `mockData` with API calls
3. Use React Query for data fetching
4. Connect to real database

---

## 🎉 Ready to Go!

You're all set! Now:

```bash
cd Saas/frontend
npm install
npm run dev
```

Then:
1. Open http://localhost:5173
2. Login with `user@test.fr` / `test123`
3. Explore the app
4. Make your first edit
5. Build amazing things! 🚀

---

**Happy coding! 💻✨**

Refer to this guide anytime you need setup help.
