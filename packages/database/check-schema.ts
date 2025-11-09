import { sql } from "drizzle-orm";
import { db } from "./src/client";

async function checkSchema() {
    try {
        const result = await db.execute(sql`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public' AND column_name = 'id'
      ORDER BY table_name
    `);
        console.log("Tables with 'id' column:");
        console.log(JSON.stringify(result.rows, null, 2));
    } catch (error) {
        console.error("Error:", error);
    } finally {
        process.exit(0);
    }
}

checkSchema();
