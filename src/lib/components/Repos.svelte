<script>
	// @ts-nocheck

	import { cubicOut } from 'svelte/easing';
	import watch from '$lib/images/watch.svg';
	import star from '$lib/images/star.svg';
	import fork from '$lib/images/fork.svg';
	import issue from '$lib/images/issue.svg';
	import SegmentedBar from './SegmentedBar.svelte';

	// Custom transition to animate height from 0 to auto
	function expand(node, { duration, easing = cubicOut }) {
		// Include an easing parameter with a default value
		return {
			duration,
			easing, // Apply the easing function to the transition
			css: (t) => `height: ${t * node.scrollHeight}px;`
		};
	}
	/**
	 * @type {any}
	 */
	export let foo;
	/**
	 * @type {any}
	 */
	export let rawlangs;
	/**
	 * @type {{ offsetWidth: any; }}
	 */
	let stuffElement;
</script>

<div class="stuff" bind:this={stuffElement}>
	{#each foo as git}
		<main class="vertical">
			<div class="vertical overflow" in:expand={{ duration: 500 }}>
				<div class="horiz">
					<img class="icon" src={git.owner?.avatar_url} alt="" />
					<div class="vertical">
						<div class="horiz">
							<a class="name" href={git.html_url}>{git.name}</a>
						</div>
						<a class="owner" href={git.owner?.html_url}
							>{git.owner?.login}{#if git.fork}
								<img style="height: 0.5rem;" src={fork} alt="" />
							{/if}</a
						>
					</div>
				</div>
				{#if git.description}
					<p>{git.description}</p>
				{:else}
					<p><i>no description</i></p>
				{/if}
				<div class="stats horiz">
					<a href="{git.html_url}/stargazers" class="pr">
						<img src={star} alt="" />{git.stargazers_count}
					</a>
					<a href="{git.html_url}/watchers" class="pr">
						<img src={watch} alt="" />{git.watchers_count}
					</a>
					<a href="{git.html_url}/forks" class="pr">
						<img src={fork} alt="" />{git.forks}
					</a>
					<a href="{git.html_url}/issues?q=is%3Aopen" class="pr">
						<img src={issue} alt="" />{git.open_issues}
					</a>
				</div>
			</div>
			<SegmentedBar
				segments={Object.entries(git.languages.langs)}
				{rawlangs}
				total={git.languages.total}
			/>
		</main>
	{/each}
</div>

<style>
	.pr {
		margin: 0 2px;
		border: 1px solid rgba(255, 255, 255, 0);
		border-radius: 4px;
		padding: 2px;
	}
	.pr > img {
		height: 14px;
		transform: translateY(1px);
		padding: 0px 1px;
	}
	a {
		text-decoration: none;
		color: white;
	}
	.stuff {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: 0px;
		width: 100%;
		overflow: hidden;
		animation: long 1s cubic-bezier(.39,.17,.32,1) 0.5s 1 forwards;
	}
	.stuff > main {
		transition: transform 0.5s ease;
	}
	.stats {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.icon {
		height: 30px;
		border-radius: 50%;
		grid-area: icon;
		margin-right: 5px;
	}
	.name {
		height: min-content;
		margin: 0%;
		grid-area: header;
	}
	.owner {
		font-size: 10px;
	}
	main {
		display: block;
		position: relative;
		min-height: 0rem;
		border-color: rgb(92, 92, 92);
		border-width: 2px;
		border-style: solid;
		border-radius: 0px;
		animation: b 1s cubic-bezier(.39,.17,.32,1) 0.5s 1 forwards;
		padding: 5px;
	}
	.overflow {
		overflow: hidden;
	}
	.vertical {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;
	}
	@keyframes long {
		from {
			gap: 0px;
		}
		to {
			gap: 10px;
		}
	}
	@keyframes b {
		from {
			border-radius: 0px;
		}
		to {
			border-radius: 5px;
		}
	}
</style>
