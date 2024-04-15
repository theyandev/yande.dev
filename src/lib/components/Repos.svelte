<script>
	import watch from '$lib/images/watch.svg';
	import star from '$lib/images/star.svg';
	import fork from '$lib/images/fork.svg';
	import issue from '$lib/images/issue.svg';
	/**
	 * @type {any}
	 */
	export let foo;
</script>

<div class="stuff">
	{#each foo as git}
		<main class="vertical">
			<div class="horiz">
				<img class="icon" src={git.owner?.avatar_url} alt="" />
				<div class="vertical">
					<div class="horiz">
						<a class="name" href={git.html_url}>{git.name}</a>
						
						{#each Object.entries(git.languages.langs).toSpliced(2) as lang}
							<div class="lang">{lang[0]} {Math.round((lang[1] / git.languages.total) * 100)}%</div>
						{/each}
					</div>
					<a class="owner" href={git.owner?.html_url}>{git.owner?.login}{#if git.fork}
						<img style="height: 0.5rem;" src={fork} alt="" />
						{/if}</a>
				</div>
			</div>
			{#if git.description}
				<p>{git.description}</p>
			{:else}
				<p><i>no description</i></p>
			{/if}

			<div class="stats horiz">
				<a href="{git.html_url}/stargazers" class="pr">
					<img src={star} alt="">{git.stargazers_count}
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
		grid-template-columns:  repeat(auto-fill, minmax(20rem,1fr));
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
		border-radius: 10px;
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
