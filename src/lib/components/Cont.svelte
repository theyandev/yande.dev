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

	
	/**
	 * @param {string} repo
	 */
	

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
		{#each foo.git as git}
			
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
                        <a href="{git.html_url}/issues?q=is%3Aissue+author%3Atheyande" class="pr"><img src={issue} alt="">{issues(
							foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(git.full_name)
							), "any"
						).length}
                        </a>
						<a href="{git.html_url}/issues?q=is%3Apr+is%3Amerged+author%3Atheyande" class="pr"><img src={merged} alt="">{PRs(
							foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(git.full_name)
							), "merged"
						).length}
                        </a>
                        <a href="{git.html_url}/issues?q=is%3Apr+is%3Aopen+author%3Atheyande" class="pr">
                        <img src={open} alt="">{PRs(
							foo.contributions.items.filter((/** @type {{ repository_url: string | any[]; }} */ c) =>
								c.repository_url.includes(git.full_name)
							), "open"
						).length}
                        </a>
					</div>
				</main>
		{/each}
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
