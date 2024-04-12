<script>
	import merged from "$lib/images/merged.svg"
    import open from "$lib/images/open.svg"
    import issue from "$lib/images/issue.svg"
	/**
	 * @type {any}
	 */
	export let foo;

	/**
	 * @param {string | number | boolean} name
	 */

	let contrs = fetch(`https://api.github.com/search/issues?q=author:theyande`).then((r) =>
		r.json()
	);

	/**
	 * @param {string} repo
	 */
	function fetchRepo(repo) {
		return fetch(`https://api.github.com/repos/${repo}`).then((r) => r.json());
	}

	/**
	 * @param {any[]} array
	 * @param {string} status
	 */
	function PRs(array,status) {
		return array.filter((c) => c.pull_request != undefined).filter((c) => status == "merged" ? c?.pull_request?.merged_at : status == "open" ? c.state == "open": true);
	}
    /**
	 * @param {any[]} array
	 * @param {string} status
	 */
    function issues(array,status) {
		return array.filter((c) => c.pull_request == undefined).filter((c) => status == "any" ?  true : c.state == status);
	}
</script>

<div class="stuff">
	{#await contrs}
		waiting
	{:then r}
		{#each foo as repo}
			{#await fetchRepo(repo.name)}
				<p>Waiting...</p>
			{:then git}
				<main class="vertical">
					<div class="horiz">
						<img class="icon" src={git.owner.avatar_url} alt="" />
						<div class="vertical"><a class="name" href={git.html_url}>{git.name}</a>
                        <a
							class="owner"
							href={git.owner.html_url}>{git.owner.login}</a
						></div>
					</div>
                    {#if git.description}
                    <p>{git.description}</p>
                        {:else}
                        <p><i>no description</i></p>
                    {/if}

					<div class="stats horiz">
                        <a href="https://github.com/{repo.name}/issues?q=is%3Aissue+author%3Atheyande" class="pr"><img src={issue} alt="">{issues(
							r.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(repo.name)
							), "any"
						).length}
                        </a>
						<a href="https://github.com/{repo.name}/issues?q=is%3Apr+is%3Amerged+author%3Atheyande" class="pr"><img src={merged} alt="">{PRs(
							r.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(repo.name)
							), "merged"
						).length}
                        </a>
                        <a href="https://github.com/{repo.name}/issues?q=is%3Apr+is%3Aopen+author%3Atheyande" class="pr">
                        <img src={open} alt="">{PRs(
							r.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(repo.name)
							), "open"
						).length}
                        </a>
					</div>
				</main>
                {:catch}
                <p>Failed</p>
			{/await}
		{/each}
	{/await}
</div>

<style>
    .pr {
        margin: 0 2px;
        border: 1px solid rgba(255, 255, 255, 0.0) ;
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
		grid-template-columns: auto auto auto;
		gap: 10px;
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
		height: 10rem;
		width: 20rem;
		border-color: rgb(197, 197, 197);
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
    @media screen and (max-width: 1000px) {
   .stuff {
    display: flex;
    flex-direction: column;
    width: 80%;
   }
   main {
    width: 100%;
   }
}
</style>
