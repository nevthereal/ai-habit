import type { Actions, PageServerLoad } from './$types';
import { generateObject } from 'ai';
import { fail, superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { openai } from '$lib';
import { db } from '$lib/server/db';
import { habit } from '$lib/server/db/schema';

const zPromptForm = z.object({
	prompt: z.string().min(5)
});

const zHabitLLM = z.object({
	name: z.string().describe('The name of the habit'),
	description: z.string().optional().describe('A description of the habit'),
	frequency: z
		.enum(['daily', 'weekly', 'monthly'])
		.describe('The frequency of the habit, how often it should be done'),
	goal: z.number().describe('The goal of the habit, how many times it should be done')
});

export const load: PageServerLoad = async () => {
	const promptForm = await superValidate(zod(zPromptForm));

	return { promptForm };
};

export const actions: Actions = {
	new: async ({ request, locals }) => {
		const { user } = locals;

		if (!user) {
			return fail(401, { message: 'User not authenticated' });
		}

		const form = await superValidate(request, zod(zPromptForm));

		if (!form.valid) return fail(400, { form });

		const {
			data: { prompt }
		} = form;

		const { object, finishReason } = await generateObject({
			model: openai('gpt-4o-mini'),
			schema: zHabitLLM,
			prompt,
			system: 'You are a habit generator. Generate a few habits based on the prompt.',
			output: 'array'
		});

		console.log(finishReason);

		await db.insert(habit).values(
			object.map((h) => ({
				name: h.name,
				description: h.description,
				createdAt: new Date(),
				userId: user.id,
				frequency: h.frequency,
				goal: h.goal
			}))
		);

		return { form, object };
	}
};
