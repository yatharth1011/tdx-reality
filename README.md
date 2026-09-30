# TDX Reality Engine

A personal study and "tactical combat" tracker: log what you study, plan the day, set daily missions, and watch your progress grow. It's an installable web app (PWA) with cloud sync, and is also packaged for Android.

**Live:** https://tdx-reality.web.app

## Features

- **Schedule**: plan the day and log tasks as you go
- **Stats**: cumulative totals across subjects (Maths, Physics, Chemistry and more)
- **Visualize**: charts of where your time went, plus the "Droplet Engine" / cellular-flora visuals
- **Library**: manage study resources, subjects and deadlines
- **Custom missions**: add daily goals and tick them off
- **Raw data editor**: view and fix your stored data directly
- **Sign in with Google** to sync across devices; works offline as a PWA

## Tech

- Plain HTML/CSS/JS in [`public/`](public/), no build step
- Firebase Hosting, Firebase Auth (Google) and the Realtime Database
- Database rules ([`database.rules.json`](database.rules.json)) let each signed-in user read and write only their own data; Firestore is closed
- Android build: a Trusted Web Activity package generated with PWABuilder (`TDX - Google Play package/`)

## Deploy

Pushing to `main` deploys `public/` to Firebase Hosting via GitHub Actions
([`.github/workflows`](.github/workflows)). Manual deploy:

```bash
npm install -g firebase-tools
firebase deploy --only hosting
```

## Android signing key

The Play Store signing key (`signing.keystore`) and its passwords are **not** in this repository and must never be committed; `.gitignore` blocks them. Keep them somewhere safe and private.
