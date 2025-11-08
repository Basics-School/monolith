# ============================================================================
# Multi-stage Dockerfile for PayloadCMS Ecommerce Application
# ============================================================================

FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ============================================================================
# Dependencies Stage
# ============================================================================
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY turbo.json ./

# Copy all package.json files
COPY apps/ecommerce/package.json ./apps/ecommerce/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# ============================================================================
# Builder Stage
# ============================================================================
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/ecommerce/node_modules ./apps/ecommerce/node_modules

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./

# Copy packages source code
COPY packages ./packages

# Copy ecommerce app source code
COPY apps/ecommerce ./apps/ecommerce

# Build the application
WORKDIR /app/apps/ecommerce
RUN pnpm build

# ============================================================================
# Runner Stage
# ============================================================================
FROM base AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/ecommerce/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/ecommerce/.next/static ./apps/ecommerce/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/ecommerce/public ./apps/ecommerce/public

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/ecommerce/server.js"]
