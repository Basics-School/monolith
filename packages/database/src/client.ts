import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Get the connection string from environment variables
const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

// Create a postgres connection
const sql = postgres(connectionString, { prepare: false });

// Create drizzle db instance
export const db = drizzle(sql);

// Export the connection for cleanup if needed
export { sql };
