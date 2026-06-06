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

The dashboard has its own `docker-compose.yml` in this directory. It is built to
static files and served by `serve` (see `Dockerfile`) on port **8080** (the
public frontend uses 9000, so the two never clash). It sits behind the VPS
**Caddy** reverse proxy, which lives on the external `web` Docker network — the
same pattern as `frontend/docker-compose.yml`.

```bash
docker network create web   # once, if it doesn't already exist
docker compose -f admin-manager/docker-compose.yml up -d --build
```

Point Caddy at it by container name, e.g. in your Caddyfile:

```
admin.example.com {
    reverse_proxy admin-manager:8080
}
```

Because Vite inlines `VITE_*` values at **build time**, the passcode is passed
as a Docker **build arg**, not a runtime env var. Set `VITE_ADMIN_PASSCODE` in
`admin-manager/.env` (read by compose for build-arg interpolation) or in your
shell:

```
VITE_ADMIN_PASSCODE=your-strong-passcode
```

`ADMIN_BASE` (Vite's `base`) defaults to `/`, which is right when Caddy serves
the app on its own host/subdomain. If you serve it under a sub-path instead
(e.g. `/admin-manager/`), set `ADMIN_BASE=/admin-manager/` so asset URLs are
prefixed, and strip the prefix in Caddy with `handle_path /admin-manager/*`.
Changing the passcode requires a rebuild (it is baked into the bundle).
