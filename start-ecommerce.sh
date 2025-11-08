#!/usr/bin/env bash

# ============================================================================
# Ecommerce App Development Setup Script
# ============================================================================
# This script initializes and starts the PayloadCMS ecommerce application
# with self-hosted Supabase database
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colored messages
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists in root
if [ ! -f ".env" ]; then
    error ".env file not found in root directory!"
    error "Please copy .env.example to .env and configure it"
    exit 1
fi

# Check if ecommerce .env exists
if [ ! -f "apps/ecommerce/.env" ]; then
    error "apps/ecommerce/.env file not found!"
    error "Please ensure the ecommerce .env is configured"
    exit 1
fi

info "Starting PayloadCMS Ecommerce Development Setup..."
echo ""

# Step 1: Start Supabase
info "Step 1: Starting Supabase services..."
docker compose -f docker-compose.dev.yml up -d

# Wait for database to be ready
info "Waiting for database to be ready..."
until docker exec supabase-db pg_isready -U postgres -h localhost 2>/dev/null; do
    echo -n "."
    sleep 1
done
echo ""
info "Database is ready!"

# Step 2: Check if ecommerce schema exists, create if not
info "Step 2: Checking ecommerce schema..."
SCHEMA_EXISTS=$(docker exec supabase-db psql -U postgres -d postgres -tAc "SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'ecommerce';")

if [ -z "$SCHEMA_EXISTS" ]; then
    warn "Ecommerce schema not found. Creating it now..."
    docker exec -i supabase-db psql -U postgres -d postgres < supabase/volumes/db/ecommerce-schema.sql
    info "Ecommerce schema created successfully!"
else
    info "Ecommerce schema already exists!"
fi

# Step 3: Install dependencies if needed
info "Step 3: Checking dependencies..."
if [ ! -d "node_modules" ]; then
    info "Installing dependencies..."
    pnpm install
else
    info "Dependencies already installed!"
fi

# Step 4: Display service URLs
echo ""
info "============================================================================"
info "Supabase Services Started Successfully!"
info "============================================================================"
echo ""
info "Service URLs:"
echo "  • Supabase Studio:    http://localhost:8000"
echo "  • Database:           postgresql://postgres:your-super-secret-and-long-postgres-password@localhost:5432/postgres"
echo "  • API Gateway:        http://localhost:8000"
echo ""
info "To start the ecommerce app, run:"
echo "  cd apps/ecommerce && pnpm dev"
echo ""
info "The ecommerce app will be available at:"
echo "  • Frontend:           http://localhost:3001"
echo "  • Admin Panel:        http://localhost:3001/admin"
echo ""
info "============================================================================"
echo ""

# Step 5: Ask if user wants to start the app now
read -p "Do you want to start the ecommerce app now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    info "Starting ecommerce app..."
    cd apps/ecommerce
    pnpm dev
fi
