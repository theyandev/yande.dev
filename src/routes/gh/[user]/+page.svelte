<script lang="ts">
	import Repos from '$lib/components/Repos.svelte';
	import repo from '$lib/images/repo.svg';
	import followers from '$lib/images/followers.svg';
	// import Og from '$lib/components/Og.svelte';
	export let data: any;
</script>
<svelte:head>
	<title>{data.user.name}</title>
	<meta name="description" content={`${data.user.public_repos} repos, ${data.repos.length} shown`} />
	
	<!-- Open Graph  Tags -->
	<meta property="og:url" content={data.user.name} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.user.name} />
	<meta property="og:description" content={`${data.user.public_repos} repos, ${data.repos.length} shown`}/>
	
	
	<!-- Twitter (x now :sob:) Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="yande.dev" />
	<meta property="twitter:url" content={data.user.name} />
	<meta name="twitter:title" content={data.user.name} />
	<meta name="twitter:description" content={`${data.user.public_repos} repos, ${data.repos.length} shown`} />

	<!-- <Og title={data.user.name} description={`${data.user.public_repos} repos, ${data.repos.length} shown`}/> -->
</svelte:head>
<div class="center top">
	<section class="center">
		<a href={data.user.html_url} class="horiz">
			<img class="pfp" src={data.user.avatar_url} alt="" />
			<div class="vert center-v">
				<h2>{data.user.name}</h2>
				<h3>{data.user.login}</h3>
				<div class="center-h">
					<img class="img" src={repo} alt="" />

					<div tooltip={`${data.user.public_repos} repos, ${data.repos.length} shown`}>
						{data.user.public_repos} ({data.repos.length})
					</div>
					<div class="divider">·</div>
					<img class="img" src={followers} alt="" />
					<div tooltip={`${data.user.followers} followers`}>{data.user.followers}</div>
				</div>
				<p>{@html data.user.bio?.replace('\n', '<br>') ?? '<i>no bio</i>'}</p>
			</div>
		</a>
		<Repos foo={data.repos} rawlangs={data.res.langMap} userGithubLinks={false} />
	</section>
</div>

<style>
	a {
		color: white;
	}
	.divider {
		margin: 0px 0.4em;
	}
	.top {
		margin-top: 4rem;
	}
	.pfp {
		border-radius: 50%;
		margin: 10px;
		height: 10rem;
	}
	.img {
		height: 1.3em;
	}
	section {
		display: block;
		margin: 0%;
		width: 70%;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.center-v {
		display: flex;
		justify-content: center;
		/* align-items: center; */
		flex-direction: column;
	}

	.center-h {
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: row;
	}

	h2 {
		margin: 0px;
		font-size: 30px;
	}
	h3 {
		margin: 0px;
		font-size: 10px;
	}

	.vert {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;

		margin: 4px 0px;
	}
</style>
