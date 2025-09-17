# Base image with Node.js and pnpm
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Pruning stage - creates an optimized monorepo subset
FROM base AS pruner
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY . .
RUN pnpm dlx turbo prune web --docker

# Building stage - installs dependencies and builds the app
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy only the necessary package.json files and lockfile
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts --prefer-offline && pnpm store prune

# Copy source code and build
ENV SKIP_ENV_VALIDATION=1 \
    NODE_ENV=production

COPY --from=pruner /app/out/full/ .

# Optional: Enable remote caching
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm dlx turbo build --filter=web

# Runner stage - final, optimized image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S web -u 1001 -G nodejs

# Copy built application
COPY --from=builder --chown=web:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=web:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=web:nodejs /app/apps/web/public ./apps/web/public

USER web

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
CMD ["node", "apps/web/server.js"]
