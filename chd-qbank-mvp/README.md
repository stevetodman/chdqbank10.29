# Structural CHD QBank — Step 1 (Local MVP)

Local-first React + Vite + TypeScript + Tailwind v4 app with a lightweight PWA setup (installable, basic offline cache).

## Quick Start
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build & Preview
```bash
npm run build
npm run preview
```

## Folder Structure
```text
chd-qbank-mvp/
├─ public/                # app icons, favicon
├─ src/
│  ├─ components/         # QuestionCard, ScoreBar
│  ├─ data/questions.json # sample questions
│  ├─ types/              # Question interface
│  ├─ index.css           # Tailwind v4 via @import "tailwindcss"
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ vite.config.ts         # React, Tailwind (v4 plugin), PWA plugin
├─ package.json
└─ tsconfig.json
```

## Notes
- Tailwind v4 is integrated via the first‑party Vite plugin (`@tailwindcss/vite`).
- PWA is enabled using `vite-plugin-pwa` with `autoUpdate`. Icons are simple placeholders.
- Score and attempts persist in `localStorage`. Use the Reset button to clear.

## Next Ideas
- Add question editor (local JSON authoring UI).
- Tag filters (lesion, difficulty, organ system), timed mode, and spaced repetition.
- Export/import questions (JSON/CSV).
- Supabase sync (optional) for multi-device progress.