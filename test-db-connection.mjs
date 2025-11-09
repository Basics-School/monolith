import postgres from 'postgres';

const sql = postgres('postgresql://postgres:your-super-secret-and-long-postgres-password@localhost:54322/postgres', { prepare: false });

try {
  const result = await sql`SELECT 1 as test, current_database() as db`;
  console.log('✅ Connection OK:', result);
  await sql.end();
  process.exit(0);
} catch (error) {
  console.error('❌ Connection Error:', error.message);
  process.exit(1);
}
