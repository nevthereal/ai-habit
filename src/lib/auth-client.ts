import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/svelte';
export const authClient = (baseURL: string) =>
	createAuthClient({
		baseURL: baseURL,
		plugins: [usernameClient()]
	});
