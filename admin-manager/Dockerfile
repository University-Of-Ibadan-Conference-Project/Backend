# ---- Build stage ----
# Vite 8 requires a modern Node runtime.
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching). `npm install` rather than
# `npm ci` because the lockfile is generated on macOS and omits Linux-only
# optional native binaries (Tailwind oxide / Rolldown), which `npm ci` rejects.
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Build-time configuration. Vite inlines VITE_* values into the bundle at BUILD
# time, so the admin passcode must be supplied here — a runtime env_file cannot
# change an already-built static site. ADMIN_BASE sets Vite's base path so the
# app can be served under a sub-path (e.g. /admin-manager/) behind a proxy.
ARG VITE_ADMIN_PASSCODE
ARG ADMIN_BASE=/
ENV VITE_ADMIN_PASSCODE=$VITE_ADMIN_PASSCODE
ENV ADMIN_BASE=$ADMIN_BASE

COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:22-alpine

# Lightweight static file server (same approach as the public frontend image).
RUN npm install -g serve@14.1.2

WORKDIR /app
COPY --from=builder /app/dist ./dist

# Served on 8080 to stay clear of the public frontend (9000); Caddy reaches it
# by container name over the shared `web` network.
EXPOSE 8080

# -s rewrites unknown routes to index.html (single-page app).
CMD ["serve", "-s", "dist", "-l", "8080"]
