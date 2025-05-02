import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { DB_URL } from '$env/static/private';

export const db = drizzle(DB_URL, { schema });
