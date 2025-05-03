import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL) throw new Error('no db url');

export default defineConfig({
	schema: './src/lib/server/db/schema/*.sql.ts',
	dbCredentials: { url: process.env.DB_URL },
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
