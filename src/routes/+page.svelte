<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, submit, enhance, constraints, errors } = superForm(data.promptForm);
</script>

<main class="mx-auto mt-16 max-w-3xl">
	<h1 class="h1 mb-4">AI Habit</h1>
	<form use:enhance action="?/new" method="POST">
		<div class="relative">
			<textarea
				bind:value={$form.prompt}
				class="textarea placeholder:text-surface-conten h-48 w-full resize-none p-4"
				name="prompt"
				id="prompt_id"
				placeholder="What is on your mind?"
				onkeydown={(e) => {
					if (e.metaKey && e.key === 'Enter') {
						submit();
					}
				}}
			></textarea>
			<Tooltip.Provider delayDuration={100}>
				<Tooltip.Root>
					<Tooltip.Trigger type="submit" class="btn preset-filled absolute right-2 bottom-2">
						Submit
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content class="btn preset-filled-surface-100-900 mb-1 text-xs shadow-xl"
							>⌘ + ⏎</Tooltip.Content
						>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
		{#if $errors.prompt}
			<p class="text-error-500">{new Intl.ListFormat('en').format($errors.prompt)}</p>
		{/if}
	</form>
</main>
