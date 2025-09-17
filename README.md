# Monolith - Full-Stack Web Application

A modern full-stack monorepo built with Next.js, featuring both Supabase and Better Auth authentication options, Drizzle ORM, and a comprehensive UI component library.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm (package manager)
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd monolith
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy root environment file
   cp .env.example .env

   # Copy web app environment file
   cp apps/web/.env.example apps/web/.env.local
   ```
   Update the environment variables according to your setup (see [Environment Variables](#environment-variables) section).

4. **Start the development environment**
   ```bash
   # Start Supabase services (if using Supabase Auth)
   docker-compose up -d

   # Start the development server
   pnpm dev
   ```

## 🏗️ Architecture

This monorepo contains:

- **`apps/web`** - Next.js 15 application with App Router
- **`packages/database`** - Drizzle ORM schema and client
- **`packages/ui`** - Shared UI components library (shadcn/ui based)
- **`packages/transactional`** - Email templates with React Email
- **`packages/typescript-config`** - Shared TypeScript configurations

## 🔐 Authentication Options

This project supports **two authentication systems**. Choose the one that best fits your needs:

### Option 1: Supabase Auth (Recommended for most users)

✅ **Use Supabase Auth if you want:**
- Built-in authentication with minimal setup
- Social login providers out of the box
- Row Level Security (RLS)
- Real-time subscriptions
- Built-in email templates
- Dashboard for user management

**Setup:**
1. Keep the Supabase Docker setup running
2. Use Supabase client for authentication
3. Remove Better Auth dependencies if not needed

### Option 2: Better Auth (Custom authentication)

✅ **Use Better Auth if you want:**
- Full control over authentication flow
- Custom user schemas and permissions
- Advanced features like 2FA, API keys, organizations
- Custom email templates
- More flexibility in authentication logic

**Setup:**
1. The Better Auth configuration is already set up in `apps/web/src/lib/auth/`
2. Requires Redis for session storage (Upstash Redis configured)
3. Uses your custom database schema

### ⚠️ Important: Choose One Authentication System

**You should NOT use both systems simultaneously.** Pick one based on your requirements:

- **For rapid prototyping/MVP**: Use Supabase Auth
- **For production apps with complex auth requirements**: Use Better Auth

To disable one system:
- **To use only Supabase Auth**: Remove Better Auth dependencies and auth configuration
- **To use only Better Auth**: Disable Supabase Auth services in docker-compose.yml

## 📦 Available Scripts

```bash
# Development
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps for production
pnpm lint         # Lint all packages
pnpm lint:fix     # Fix linting issues and format code
pnpm type-check   # Run TypeScript type checking

# Database
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run database migrations
pnpm db:push      # Push schema changes to database
pnpm db:pull      # Pull schema from database
pnpm db:studio    # Open Drizzle Studio

# Testing
pnpm test         # Run tests across all packages

# Utilities
pnpm clean        # Clean build artifacts
```

## 🔧 Environment Variables

The project uses multiple environment files:

- **Root `.env`**: Main application configuration (database, auth, services)
- **Web App `.env.local`**: Next.js specific variables (public URLs, client-side config)

### Environment Files:

1. **`.env.example`** → **`.env`** (Root configuration)
   - Database connection settings
   - Authentication secrets and API keys
   - Email/SMTP configuration
   - Supabase services configuration
   - Security keys and secrets

2. **`apps/web/.env.example`** → **`apps/web/.env.local`** (Web app configuration)
   - Next.js public variables (`NEXT_PUBLIC_*`)
   - Client-side Supabase configuration
   - Better Auth settings
   - Redis configuration for sessions

### Key Environment Categories:

- **Database**: PostgreSQL connection settings
- **Authentication**: JWT secrets, API keys (choose Supabase OR Better Auth)
- **Email**: SMTP configuration for transactional emails
- **Storage**: File upload and image processing
- **External Services**: Redis, analytics, monitoring

**Security Note**: Never commit actual `.env` files to version control. Only the `.env.example` files should be tracked.

## 🗄️ Database

The project uses:
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations
- **Migrations** for schema management

Database schema is defined in `packages/database/src/schema/`.

## 📧 Email System

Transactional emails are handled via:
- **React Email** for template creation (`packages/transactional/`)
- **SMTP** configuration for delivery
- Templates include: welcome, magic link, invite user, verify identity

## 🎨 UI Components

The UI library (`packages/ui/`) includes:
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Next Themes** for dark/light mode support

## 🚀 Deployment

### Docker Deployment

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Build Docker image**
   ```bash
   docker build -t monolith .
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Environment-specific Configuration

- **Development**: Uses local Supabase instance
- **Production**: Update URLs and secrets in environment variables

## 🛠️ Development

### Project Structure

```
monolith/
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── database/           # Drizzle ORM setup
│   ├── ui/                 # Shared UI components
│   ├── transactional/      # Email templates
│   └── typescript-config/  # Shared TS configs
├── supabase/              # Supabase Docker setup
└── docker-compose.yml     # Services orchestration
```

### Environment Files Management

The project uses a multi-level environment configuration:

```bash
# Root level environment (main services)
/workspaces/monolith/.env.example → .env

# Web application environment (Next.js specific)
/workspaces/monolith/apps/web/.env.example → .env.local
```

**Setup Order:**
1. Copy and configure root `.env` first (database, auth services)
2. Copy and configure web app `.env.local` second (client-side config)
3. Ensure both files have consistent URLs and keys

**Environment Inheritance:**
- Web app inherits some variables from root environment
- Web app `.env.local` takes precedence for Next.js specific variables
- Database packages inherit `DATABASE_URL` from root environment

### Adding New Features

1. **New UI Components**: Add to `packages/ui/src/components/`
2. **Database Changes**: Update schema in `packages/database/src/schema/`
3. **API Routes**: Add to `apps/web/src/app/api/`
4. **Email Templates**: Create in `packages/transactional/emails/`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter web test
pnpm --filter @workspace/database test
```

## 📖 Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
