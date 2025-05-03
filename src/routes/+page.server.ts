import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

const promptSchema = z.object({
	prompt: z.string().min(5)
});

export const load: PageServerLoad = async () => {
	const promptForm = await superValidate(zod(promptSchema));

	return { promptForm };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const form = await superValidate(request, zod(promptSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form);
	}
};
