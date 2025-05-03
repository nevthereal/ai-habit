// place files you want to import through the `$lib` alias in this folder.
import { OPENAI_KEY } from '$env/static/private';
import { createOpenAI } from '@ai-sdk/openai';

export const openai = createOpenAI({
	apiKey: OPENAI_KEY
});
