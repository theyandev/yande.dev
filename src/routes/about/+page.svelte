<svelte:head>
	<title>About</title>
	<meta name="description" content="About yande" />
	<meta property="og:title" content="abot yande" />
	<meta property="og:image" content="https://cataas.com/cat" />
</svelte:head>
<script>
	import { gracefulFetch } from "$lib/functions";

let pPage = gracefulFetch("https://en.pronouns.page/api/profile/get/yande?version=2 ")
</script>
<div class="text-column">
	<section class="center" style="margin-top: 60px;">
		{#await pPage}
			<h1>Fetching Info...</h1>
		{:then pPage} 
		<h1>About</h1>
		<div class="horiz"><img  class="pfp" src={pPage.avatar} alt="">
		</div>
		{/await}
		
		<!-- <img src="https://cataas.com/cat" style="height: 400px; border-radius:30px" alt="cat" /> -->
		<p>heres what im up to on discord:</p>
		<img
			src="https://lanyard.cnrad.dev/api/713805665407205426?showDisplayName=true&idleMessage=Not%20doin%20crap"
			alt="discordthing"
		/>

		<p>oh yeah i like cats</p>
	</section>
</div>

<style>
	.pfp {
		border-radius: 50%;
	}
	section {
		display: block;
		margin: 0%;
		width: 100%;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	h1 {
		font-weight: bolder;
		font-size: 50px;
		margin: 0%;
	}
	.vert {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;
	}
</style>
