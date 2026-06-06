# Registrations Admin (admin-manager)

Internal dashboard for managing ICFC conference registrations. It reads the
same Firebase project as the public site (`frontend/`): every record the
registration form writes to the Firestore `participants` collection shows up
here in real time.

## What it does

- **Live list** of all registrations (Firestore `onSnapshot` — no refresh).
- **Search** across name, email, phone, institution and location.
- **Filter** by status (pending / approved / rejected) and participant type
  (physical / virtual).
- **Overview figures** — totals per status and per type.
- **Status management** — approve, reject, or reset a registration to pending.
- **Receipt view** — preview/open/download each uploaded payment receipt.
- **CSV export** of the current filtered view.

## Getting started

```bash
cd admin-manager
npm install
cp .env.example .env.local      # then set VITE_ADMIN_PASSCODE
npm run dev
```

Open the printed URL and enter the passcode.

## Access / passcode

`VITE_ADMIN_PASSCODE` (in `.env.local`) gates the dashboard with a single
passphrase, kept for the browser session. **This is a deterrent, not real
security** — the passcode is bundled into the client and anyone with the
Firebase config could read the collection directly. Before exposing this
publicly, add Firebase Auth and Firestore security rules that require an
authenticated admin for reads and writes.

## Firebase

`src/firebase.ts` mirrors `frontend/src/firebase.js` and points at the `icfcui`
project. The web config is not secret; access is governed by Firestore rules.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Deployment

The dashboard ships as a static site behind the project's nginx, via
`docker-compose.production.yml`. It is built to static files and served by
`serve` (see `Dockerfile`), then proxied at **`/admin-manager/`** on the main
domain (the longer prefix takes precedence over the Django `/admin` route).

Because Vite inlines `VITE_*` values at **build time**, the passcode is passed
as a Docker **build arg**, not a runtime env var. Set it in the root `./.env`:

```
VITE_ADMIN_PASSCODE=your-strong-passcode
```

then build and start:

```bash
docker compose -f docker-compose.production.yml up -d --build admin-manager nginx
```

The image is built with `ADMIN_BASE=/admin-manager/` (Vite's `base`), so all
asset URLs are prefixed and nginx strips the prefix when proxying. To serve it
at the domain root or a subdomain instead, set `ADMIN_BASE=/` in the compose
build args and adjust the nginx `location` accordingly. Changing the passcode
requires a rebuild (it is baked into the bundle).
