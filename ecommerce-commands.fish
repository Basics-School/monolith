#!/usr/bin/env fish

# ============================================================================
# PayloadCMS Ecommerce - Quick Reference Commands
# ============================================================================

# Colors for output
set -l GREEN '\033[0;32m'
set -l YELLOW '\033[1;33m'
set -l BLUE '\033[0;34m'
set -l NC '\033[0m' # No Color

function print_header
    echo -e "$BLUE╔════════════════════════════════════════════════════════════════╗$NC"
    echo -e "$BLUE║  PayloadCMS Ecommerce - Quick Command Reference               ║$NC"
    echo -e "$BLUE╚════════════════════════════════════════════════════════════════╝$NC"
    echo ""
end

function print_section
    echo -e "$GREEN▶ $argv[1]$NC"
end

print_header

# Development Commands
print_section "🚀 Development Commands"
echo "  Start ecommerce app:"
echo "    cd apps/ecommerce && pnpm dev"
echo ""
echo "  Start with Supabase:"
echo "    ./start-ecommerce.sh"
echo ""
echo "  Generate TypeScript types:"
echo "    pnpm generate:types"
echo ""

# Supabase Commands
print_section "🗄️  Supabase Commands"
echo "  Start all services:"
echo "    docker compose -f docker-compose.dev.yml up -d"
echo ""
echo "  Stop all services:"
echo "    docker compose -f docker-compose.dev.yml down"
echo ""
echo "  View logs:"
echo "    docker compose -f docker-compose.dev.yml logs -f"
echo ""
echo "  Restart database:"
echo "    docker compose -f docker-compose.dev.yml restart supabase-db"
echo ""

# Database Commands
print_section "💾 Database Commands"
echo "  Connect to database:"
echo "    docker exec -it supabase-db psql -U postgres -d postgres"
echo ""
echo "  List ecommerce tables:"
echo "    docker exec supabase-db psql -U postgres -d postgres -c '\dt ecommerce.*'"
echo ""
echo "  Check schema:"
echo "    docker exec supabase-db psql -U postgres -d postgres -c '\dn'"
echo ""
echo "  Recreate ecommerce schema:"
echo "    docker exec -i supabase-db psql -U postgres -d postgres < supabase/volumes/db/ecommerce-schema.sql"
echo ""

# Access URLs
print_section "🌐 Access URLs"
echo "  Frontend:        http://localhost:3001"
echo "  Admin Panel:     http://localhost:3001/admin"
echo "  Supabase Studio: http://localhost:8000"
echo "  API Gateway:     http://localhost:8000"
echo ""

# Testing Commands
print_section "🧪 Testing Commands"
echo "  Run all tests:"
echo "    pnpm test"
echo ""
echo "  Integration tests:"
echo "    pnpm test:int"
echo ""
echo "  E2E tests:"
echo "    pnpm test:e2e"
echo ""

# Stripe Commands
print_section "💳 Stripe Commands"
echo "  Forward webhooks (development):"
echo "    pnpm stripe-webhooks"
echo ""

# Status Check
print_section "📊 Status Check"
echo "  Check services:"
echo "    docker compose -f docker-compose.dev.yml ps"
echo ""
echo "  Check database health:"
echo "    docker exec supabase-db pg_isready -U postgres"
echo ""

# Documentation
print_section "📚 Documentation"
echo "  Setup Guide:     apps/ecommerce/README_SETUP.md"
echo "  Summary:         ECOMMERCE_SETUP_COMPLETE.md"
echo ""

echo -e "$YELLOW════════════════════════════════════════════════════════════════$NC"
echo ""
