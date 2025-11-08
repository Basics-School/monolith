import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

// Cache for database connections per schema
const schemaConnections = new Map<string, {
    sql: postgres.Sql;
    db: PostgresJsDatabase;
}>();

/**
 * Creates or retrieves a cached database connection for a specific PostgreSQL schema
 *
 * IMPORTANT: All projects share the same database connection but use different schemas.
 * Each project gets its own isolated schema (e.g., 'project_abc123') within the shared database.
 * This provides data isolation without needing separate database instances.
 *
 * The platform uses the 'public' schema, and each SaaS project gets its own schema.
 * PostgreSQL's search_path is used to route queries to the correct schema.
 *
 * @param schemaName - The PostgreSQL schema name (e.g., 'public', 'project_abc123')
 * @returns Drizzle database instance configured for the specified schema
 */
export function getSchemaDb(schemaName: string): PostgresJsDatabase {
    // Check if we already have a connection for this schema
    if (schemaConnections.has(schemaName)) {
        return schemaConnections.get(schemaName)!.db;
    }

    // Create a new connection with schema-specific search path
    const sql = postgres(connectionString, {
        prepare: false,
        onnotice: () => { }, // Suppress notices
        connection: {
            // Set the search path to the specific schema
            search_path: schemaName,
        },
    });

    // Create drizzle db instance
    const db = drizzle(sql);

    // Cache the connection
    schemaConnections.set(schemaName, { sql, db });

    return db;
}

/**
 * Executes raw SQL in a specific schema
 * @param schemaName - The PostgreSQL schema name
 * @param query - The SQL query to execute
 * @param params - Optional query parameters
 * @returns Query result
 */
export async function executeInSchema<T = any>(
    schemaName: string,
    query: string,
    params?: any[]
): Promise<T> {
    const sql = postgres(connectionString, {
        prepare: false,
        connection: {
            search_path: schemaName,
        },
    });

    try {
        const result = await sql.unsafe(query, params);
        return result as T;
    } finally {
        await sql.end();
    }
}

/**
 * Closes a specific schema connection
 * @param schemaName - The schema name to close connection for
 */
export async function closeSchemaConnection(schemaName: string): Promise<void> {
    const connection = schemaConnections.get(schemaName);
    if (connection) {
        await connection.sql.end();
        schemaConnections.delete(schemaName);
    }
}

/**
 * Closes all schema connections
 * Useful for cleanup during application shutdown
 */
export async function closeAllSchemaConnections(): Promise<void> {
    const closePromises = Array.from(schemaConnections.values()).map(
        ({ sql }) => sql.end()
    );
    await Promise.all(closePromises);
    schemaConnections.clear();
}

/**
 * Gets the number of active schema connections
 * Useful for monitoring and debugging
 */
export function getActiveConnectionCount(): number {
    return schemaConnections.size;
}

/**
 * Lists all active schema connections
 * Useful for debugging
 */
export function getActiveSchemas(): string[] {
    return Array.from(schemaConnections.keys());
}
