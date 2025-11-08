-- ============================================================================
-- Ecommerce Schema Initialization for PayloadCMS
-- ============================================================================
-- This script creates a separate 'ecommerce' schema for PayloadCMS tables
-- to avoid conflicts with other applications using the same database
--
-- Run this before starting the PayloadCMS ecommerce application
-- ============================================================================

-- Create ecommerce schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS ecommerce;

-- Grant usage on the schema to the postgres user
GRANT USAGE ON SCHEMA ecommerce TO postgres;
GRANT USAGE ON SCHEMA ecommerce TO authenticator;
GRANT USAGE ON SCHEMA ecommerce TO supabase_admin;

-- Grant all privileges on the schema to postgres and supabase_admin
GRANT ALL ON SCHEMA ecommerce TO postgres;
GRANT ALL ON SCHEMA ecommerce TO supabase_admin;

-- Set default privileges for future tables in the ecommerce schema
ALTER DEFAULT PRIVILEGES IN SCHEMA ecommerce
GRANT ALL ON TABLES TO postgres, supabase_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA ecommerce
GRANT SELECT ON TABLES TO authenticator;

ALTER DEFAULT PRIVILEGES IN SCHEMA ecommerce
GRANT ALL ON SEQUENCES TO postgres, supabase_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA ecommerce
GRANT USAGE ON SEQUENCES TO authenticator;

-- Set search_path for postgres user to include ecommerce schema
-- This ensures that PayloadCMS can find its tables without schema prefix
-- Uncomment the line below if you want ecommerce schema to be in the default search path
-- ALTER DATABASE postgres SET search_path TO public, ecommerce;

-- Note: PayloadCMS will automatically create all necessary tables in this schema
-- when it first connects to the database and runs migrations

-- ============================================================================
-- Additional Notes:
-- ============================================================================
--
-- 1. This schema isolation approach allows multiple applications to use
--    the same PostgreSQL database without table name conflicts
--
-- 2. PayloadCMS tables will be created in the 'ecommerce' schema when
--    the application first starts and runs its migrations
--
-- 3. The connection string in .env includes ?schema=ecommerce to tell
--    PayloadCMS which schema to use
--
-- 4. Common PayloadCMS tables that will be created:
--    - ecommerce.users
--    - ecommerce.pages
--    - ecommerce.products
--    - ecommerce.categories
--    - ecommerce.media
--    - ecommerce.orders
--    - ecommerce.payload_preferences
--    - ecommerce.payload_migrations
--    - And others depending on your collections
--
-- ============================================================================
