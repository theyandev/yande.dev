<script lang="ts">

	import Issues from '$lib/components/Issues.svelte';
	// import Og from '$lib/components/Og.svelte';

	export let data: any;
</script>
<svelte:head>
	<title>{data.repo.name}</title>
	<meta name="description" content={`by ${data.repo.name}`} />
	
	<!-- Open Graph  Tags -->
	<meta property="og:url" content={data.repo.name} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.repo.name} />
	<meta property="og:description" content={`by ${data.repo.name}`}/>
	
	
	<!-- Twitter (x now :sob:) Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="yande.dev" />
	<meta property="twitter:url" content={data.repo.name} />
	<meta name="twitter:title" content={data.repo.name} />
	<meta name="twitter:description" content={`by ${data.repo.name}`} />

	<!-- <Og title={data.repo.name} description={`by ${data.repo.name}`}/> -->
</svelte:head>
<div class="center top">
	<section class="center">
		<a href={data.repo.html_url}>
			<div class="horiz">
				<img class="pfp" src={data.user.avatar_url} alt="" />
				<div class="vert center-v">
					<h2>{data.repo.name}</h2>
					<h3>{data.repo.name}</h3>
				</div>
			</div>
		</a>
		<Issues foo={data.issues} />
	</section>
</div>

<style>
	a {
		color: white;
	}
	.top {
		margin-top: 4rem;
	}
	.pfp {
		border-radius: 50%;
		margin: 10px;
		height: 4rem;
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
