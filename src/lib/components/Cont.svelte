<script>
	import merged from '$lib/images/merged.svg';
	import open from '$lib/images/open.svg';
	import issue from '$lib/images/issue.svg';
	import SegmentedBar from './SegmentedBar.svelte';
	/**
	 * @type {any}
	 */
	export let foo;
	/**
	 * @type {any}
	 */
	export let rawlangs;
	/**
	 * @param {string | number | boolean} name
	 */

	/**
	 * @param {string} repo
	 */

	/**
	 * @param {any[]} array
	 * @param {string} status
	 */

	function PRs(array, status) {
		return array
			.filter((c) => c.pull_request != undefined)
			.filter((c) =>
				status == 'merged'
					? c?.pull_request?.merged_at
					: status == 'open'
						? c.state == 'open'
						: true
			);
	}
	/**
	 * @param {any[]} array
	 * @param {string} status
	 */
	function issues(array, status) {
		return array
			.filter((c) => c.pull_request == undefined)
			.filter((c) => (status == 'any' ? true : c.state == status));
	}
</script>

<div class="stuff">
	{#each foo.git as git}
		<main class="vertical">
			<div class="horiz">
				<img class="icon" src={git.owner?.avatar_url} alt="" />
				<div class="vertical">
					<div class="horiz">
						<a class="name" href={git.html_url}>{git.name}</a>
					</div>
					<a class="owner" href={git.owner?.html_url}>{git.owner?.login}</a>
				</div>
			</div>
			{#if git.description}
				<p>{git.description}</p>
			{:else}
				<p><i>no description</i></p>
			{/if}

			<div class="stats horiz">
				<a href="{git.html_url}/issues?q=is%3Aissue+author%3Atheyande" class="pr"
					><img src={issue} alt="" />{issues(
						foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
							c.repository_url.includes(git.full_name)
						),
						'any'
					).length}
				</a>
				<a href="{git.html_url}/issues?q=is%3Apr+is%3Amerged+author%3Atheyande" class="pr"
					><img src={merged} alt="" />{PRs(
						foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
							c.repository_url.includes(git.full_name)
						),
						'merged'
					).length}
				</a>
				<a href="{git.html_url}/issues?q=is%3Apr+is%3Aopen+author%3Atheyande" class="pr">
					<img src={open} alt="" />{PRs(
						foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
							c.repository_url.includes(git.full_name)
						),
						'open'
					).length}
				</a>
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
	.lang {
		font-size: 0.6rem;
		display: flex;
		align-items: center;
		height: 100%;
		margin-left: 5px;
		background-color: rgb(76, 76, 76);
		border-radius: 1rem;
		padding: 0px 5px;
	}
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
		gap: 10px;
		width: 100%;
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
		position: relative;
		min-height: 0rem;
		border-color: rgb(92, 92, 92);
		border-width: 2px;
		border-style: solid;
		border-radius: 5px;
		padding: 5px;
	}
	.vertical {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;
	}
</style>
