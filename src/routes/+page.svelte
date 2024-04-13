<script lang="ts">
	import Cont from '$lib/components/Cont.svelte';
	import { gracefulFetch } from '$lib/functions';
	let languages = [
		{
			n: 'JavaScript',
			f: 95,
			c: '#f7df1e',
			t: true
		},
		{
			n: 'TypeScript',
			f: 90,
			c: '#007acc',
			t: false
		},
		{
			n: 'Python',
			f: 30,
			c: '#FFE873',
			t: true
		},
		{
			n: 'HTML',
			f: 90,
			c: '#F16529',
			t: false
		},
		{
			n: 'CSS',
			f: 70,
			c: '#264de4',
			t: false
		},
		{
			n: 'Java',
			f: 0,
			c: '#f89820',
			t: false
		},
		{
			n: 'C',
			f: 0,
			c: '#004283',
			t: false
		},
		{
			n: 'C#',
			f: 0,
			c: '#5731d7',
			t: false
		},
		{
			n: 'C++',
			f: 0,
			c: '#00589d',
			t: false
		},

		{
			n: 'Ruby',
			f: 0,
			c: '#8c0601',
			t: false
		}
	]
		.toSorted((a, b) => b.f - a.f)
		.filter((a) => a.f > 0);

	let projects = gracefulFetch(`/api/github`)
		
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="A website for a professional idiot" />
</svelte:head>
<section class="center">
	<div class="divider">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
				class="shape-fill"
			></path>
		</svg>
	</div>
	<h1 class="name" style="background-color: white ; color: black;">Hi, Im Yande</h1>
	<div class="divider v-flip">
		<svg
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1200 120"
			preserveAspectRatio="none"
		>
			<path
				d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
				class="shape-fill"
			></path>
		</svg>
	</div>
	<section class="center">
		<h2>Contributions</h2>
		{#await projects}
		<p>Fetching Contributions</p>
	{:then projects}
		<Cont foo={projects} />
		{:catch a}
		<p>Failed to load contributions</p>
	{/await}
	</section>
	
	<section class="center">
		<h2>Languages</h2>
		<p>here are some of the languages I know</p>
		<ul>
			{#each languages as lang}
				<li>
					{lang.n}
					<div class="animated-progress">
						<span
							style="width: {lang.f}%; background-color:{lang.c}; color:{!lang.t
								? 'white'
								: 'black'};">{lang.f}%</span
						>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</section>

<!-- <section>
	<ul class="langs">
		{#each languages as lang}
			<li class="lang">
				
				<div class="lang-bar"><p>{lang.n}</p><div>  </div></div>
			</li>
		{/each}
	</ul>
</section> -->

<style>
	section {
		display: block;
		margin: 0%;
		width: 100%;
	}

	.name {
		width: 100%;
		text-align: center;
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
	h2 {
		font-weight: bolder;
		font-size: 40px;
		margin: 20px 0px;
	}

	.divider {
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		line-height: 0;
	}
	ul {
		list-style: none;
	}
	.divider svg {
		position: relative;
		display: block;
		width: calc(157% + 1.3px);
		height: 109px;
	}

	.divider .shape-fill {
		fill: #ffffff;
	}
	.v-flip {
		transform: rotateY(180deg) scaleY(-1);
	}

	.animated-progress {
		width: 300px;
		height: 30px;
		border-radius: 5rem;
		margin: 20px 10px;
		border: 1px solid rgb(189, 113, 113);
		overflow: hidden;
		position: relative;
	}

	.animated-progress span {
		height: 100%;
		display: block;
		color: rgb(255, 251, 251);
		line-height: 30px;
		position: absolute;
		text-align: end;
		padding-right: 5px;
	}
</style>
