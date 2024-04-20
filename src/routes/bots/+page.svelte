<script>
	// @ts-nocheck

	import { gracefulFetch } from '$lib/functions';
</script>

<svelte:head>
	<title>My bots</title>
	<meta name="description" content="About yande" />
	<meta property="og:title" content="abot yande" />
	<meta property="og:image" content="https://cataas.com/cat" />
</svelte:head>
<div class="text-column center">
	<section class="center" style="margin-top: 60px;">
		<h1>My bots</h1>
		<p>i have some discord bots that are pretty cool i guess</p>
		<ul>
			<li class="center">
				<div class="horiz">
					<img
						class="pfp"
						src="https://cdn.discordapp.com/avatars/1088592718864846910/adf539e75083455999206eea12a9a45e.webp?size=4096"
						alt=""
					/>
					<h2>YandeAI</h2>
				</div>

				<p>
					a gpt powered chatbot that is ment to replicate how i act! its just a strange lil fella
				</p>
				<div class="btn center">
					<a
						href="https://discord.com/api/oauth2/authorize?client_id=1088592718864846910&permissions=67584&scope=bot"
						>Invite</a
					>
				</div>
			</li>
			<li class="center">
				<div class="horiz center">
					<img
						class="pfp"
						src="https://cdn.discordapp.com/avatars/1104497356361187469/ec23c601b32af86f7bb7c224370f22c3.webp?size=4096"
						alt=""
					/>
					<h2>ChatGPT</h2>
				</div>

				<p>
					ChatGPT 4 in discord, without paying a cent!
				</p>
				<div class="btn center">
					<a
						href="https://discord.com/api/oauth2/authorize?client_id=1104497356361187469&permissions=67584&scope=bot"
						>Invite</a
					>
				</div>
			</li>
			<li class="center">
			

				<p>
					yaknow i <i>had</i> more bots but then replit killed free hosting so they ded
				</p>
				
			</li>
		</ul>
	</section>
</div>

<style>
	.btn {
		border: none;
		color: rgb(255, 255, 255);
		background: rgb(43, 43, 43);
		padding: 5px 15px;
		font-size: 15px;
		margin-top: 15px;
		border-radius: 15px;
	}
	a {
		color: rgb(255, 255, 255);
	}
	li {
		border-color: rgb(255, 255, 255);
		border-width: 5px;
		border-style: solid;
		border-radius: 20px;
		padding: 20px;
	}
	.horiz-divider {
		height: 5px;
		width: 100%;
		background-color: black;
		margin: 25px 0px;
	}
	.smol {
		font-size: 0.5rem;
	}
	.pronoun {
		margin: 0px 5px;
	}
	.flag {
		height: 20px;
		margin: 0px 5px;
		border-radius: 5px;
	}
	.pfp {
		border-radius: 50%;
		margin: 10px;
		height: 50px;
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
	.left {
		display: flex;
		justify-content: left;
		flex-direction: column;
	}
	h1 {
		font-weight: bolder;
		font-size: 50px;
		margin: 0%;
	}
	h2 {
		margin: 0px;
		font-size: 30px;
	}
	p {
		margin: 0px;
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
