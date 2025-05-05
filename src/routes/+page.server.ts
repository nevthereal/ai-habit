import type { Actions, PageServerLoad } from './$types';
import { generateObject } from 'ai';
import { fail, superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { openai } from '$lib';
import { createInsertSchema } from 'drizzle-zod';
import { habit } from '$lib/server/db/schema';

const zPromptForm = z.object({
	prompt: z.string().min(5)
});

export const load: PageServerLoad = async () => {
	const promptForm = await superValidate(zod(zPromptForm));

	return { promptForm };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const form = await superValidate(request, zod(zPromptForm));

		if (!form.valid) return fail(400, { form });

		const {
			data: { prompt }
		} = form;

		const { object, finishReason } = await generateObject({
			model: openai('gpt-4o-mini'),
			schema: createInsertSchema(habit).partial({
				description: true,
				frequency: true,
				goal: true,
				name: true
			}),
			prompt,
			system: 'You are a habit generator. Generate a few habits based on the prompt.',
			output: 'array'
		});

		console.log(finishreason);

		return { form };
	}
};
