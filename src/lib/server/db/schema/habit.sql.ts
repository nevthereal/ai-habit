import { integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.sql';

const userId = text('user_id')
	.notNull()
	.references(() => user.id, { onDelete: 'cascade' });

export const frequency = pgEnum('frequency', ['daily', 'weekly', 'monthly']);

export const habit = pgTable('habit', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	userId,
	frequency: frequency().notNull().default('daily'),
	goal: integer('goal').notNull().default(3)
});

export const category = pgTable('category', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const entry = pgTable('entry', {
	id: uuid('id').primaryKey().defaultRandom(),
	habitId: uuid('habit_id')
		.notNull()
		.references(() => habit.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	userId
});

export const report = pgTable('report', {
	id: uuid('id').primaryKey().defaultRandom(),
	habitId: uuid('habit_id')
		.notNull()
		.references(() => habit.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
