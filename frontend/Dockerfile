# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

# Install a lightweight static server
RUN npm install -g serve@14.1.2

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 9000

# Start the static server (no -s rewrite: SSG produces per-route .html files)
CMD ["serve", "build", "-l", "9000"]
