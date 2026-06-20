# 🍽️ Food Tracker

Track your daily meals and calories. A single-page app that works **fully offline** — runs entirely in your browser with automatic localStorage fallback when the backend is unavailable.

## Live Demo

**[https://areksoulahian.github.io/Food-tracker-mern/](https://areksoulahian.github.io/Food-tracker-mern/)**

> The live demo runs in local-only mode (no backend). All data is saved to your browser's localStorage.

## How to Use

1. **Create a user** — set up your profile
2. **Add a food item** — log what you ate (name, calories, date)
3. **Check the food log** — review, edit, or delete your entries

## Tech Stack

| Frontend | Backend |
|---|---|
| React 19 | Express |
| React Router 7 | Node.js |
| Vite | (local JSON file storage) |
| Bootstrap 5 | |

## Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (separate terminal)
npm install
npm run dev
```

The frontend dev server proxies `/foods` and `/users` requests to the backend at `localhost:5000`. If the backend isn't running, the app automatically falls back to localStorage.

## Build for Production

```bash
npm run build
```

Output goes to `docs/` for GitHub Pages deployment.

## Deploy to GitHub Pages

1. Push the repo (including the `docs/` folder)
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`, folder: `/docs`
5. Save

## Features

- Create, edit, and delete food entries
- Calorie tracking per entry
- User profiles
- Offline-capable (localStorage fallback)
- Responsive design
- Connection status indicator (Backend / Local mode)
