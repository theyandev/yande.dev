<script lang="ts">
	//@ts-nocheck
	import Cont from '$lib/components/Cont.svelte';
	import Repos from '$lib/components/Repos.svelte';
	import { gracefulFetch } from '$lib/functions';
	import { onMount } from 'svelte';
	import fork from '$lib/images/fork.svg';
	import calander from '$lib/images/calander.svg';
	import code from '$lib/images/code.svg';
	import filt from '$lib/images/filter.svg';
	import Load from '$lib/components/Load.svelte';
	import Seg from '$lib/components/Seg.svelte';
	// import Og from '$lib/components/Og.svelte';
	let filtersShown = false;

	function addArr(arr: number[]) {
		let t = 0;
		arr.forEach((element) => {
			t += element;
		});
		return t;
	}
	let repoFilters: { o: any; d: any }[] = [{ o: 'date', d: '' }];

	let activeLangFilters: any[] = [];

	let CodeFiltersShown = false;
	function getUnixTimestampAgo(amount: number, unit: string) {
		let currentDate = new Date();
		if (unit === 'months') {
			currentDate.setMonth(currentDate.getMonth() - amount);
		} else if (unit === 'years') {
			currentDate.setFullYear(currentDate.getFullYear() - amount);
		} else if (unit === 'days') {
			currentDate.setDate(currentDate.getDate() - amount);
		}

		return currentDate.getTime() / 1000; // Convert milliseconds to seconds for Unix timestamp
	}
	function getOption(option: any) {
		return repoFilters.some(
			(item: { o: any; d: any }) => item.o === option.o && item.d === option.d
		);
	}
	function toggleOption(option: any) {
		if (
			repoFilters.some((item: { o: any; d: any }) => item.o === option.o && item.d === option.d)
		) {
			repoFilters = repoFilters.filter(
				(item: { o: any; d: any }) => !(item.o === option.o && item.d === option.d)
			);
		} else {
			repoFilters.push(option);
		}
		return repoFilters;
	}
	let filterValue = 0;
	let filterUnit = 'none';
	function filter(item: any, filter: { o: string; d: any }) {
		switch (filter.o) {
			case 'date':
				return filterUnit == 'none'
					? true
					: Date.parse(item.updated_at) / 1000 - getUnixTimestampAgo(filterValue, filterUnit) > 0;
			case 'lang': {
				return Object.keys(item.languages.langs).some((a: any) => {
					return a.toLowerCase() == filter.toLowerCase();
				});
			}
			case 'fork':
				return item.fork == filter.d;
			default:
				return true;
		}
	}
	import type { Pagedata } from './$types';

	export let data: Pagedata;

	let IncludeForks = false;

	function a(a: any, b: any, v: any) {
		return b.repo.all.filter((item: any) => {
			let acc = true;
			a.forEach((filterCriteria: { o: string; d: any }) => {
				acc = acc && filter(item, filterCriteria);
			});
			return acc;
		});
	}
	onMount(() => {
		setInterval(() => {
			filteredRepos = a(repoFilters, data.projects, { filterValue });
			IncludeForks = repoFilters.some(
				(item: { o: any; d: any }) => item.o === 'fork' && item.d === false
			);
			activeLangFilters = repoFilters.filter((a) => a.o == 'lang').map((a) => a.d);
		}, 100);
	});
	let filteredRepos: any[] = [];

	// let repos = gracefulFetch(`/api/github/repos`)
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<svelte:head>
	<title>yande.dev</title>
<meta name="description" content=website for dumdum />

<!-- Open Graph  Tags -->
<meta property="og:url" content=yande.dev />
<meta property="og:type" content="website" />
<meta property="og:title" content=yande.dev />
<meta property="og:description" content=website for dumdum/>


<!-- Twitter (x now :sob:) Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="yande.dev" />
<meta property="twitter:url" content=yande.dev />
<meta name="twitter:title" content=:3 />
<meta name="twitter:description" content=website for dudum />

</svelte:head>
<main class="center">
	<hero class="center">
		<div class="divider">
			<svg
				data.name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				style="transform: translateY(1px);"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					class="shape-fill"
				></path>
			</svg>
		</div>
		<h1 class="name" style="background-color: white ; color: black;">Hi, Im Yande {Math.floor(Math.random() * 10) == 5? ":3" : ""}</h1>
		<div class="divider v-flip">
			<svg
				data.name="Layer 1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1200 120"
				preserveAspectRatio="none"
				style="transform: translateY(1px);"
			>
				<path
					d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
					class="shape-fill"
				></path>
			</svg>
		</div>
	</hero>
	<section class="center">
		{#if data.resolved == 't'}
			{#await data.projects}
				<h2>Fetching Contributions & Repositories</h2>
				<Load />
			{:then projects}
				<h2>Contributions</h2>
				<Cont
					foo={projects?.cont ?? {
						contributions: {
							total_count: 0,
							incomplete_results: false,
							items: []
						},
						git: []
					}}
					rawlangs={projects.langMap}
					userGithubLinks={false}
				/>

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="horiz v-center">
					<h2>Repositories</h2>
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						style="border-radius:5px; opacity: {filtersShown ? '1' : '0.2'};"
						src={filt}
						alt="filters"
						on:click={() => {
							filtersShown = !filtersShown;
							if (getOption({ o: 'fork', d: false })) toggleOption({ o: 'fork', d: false });
							filterUnit = 'none';
							filterValue = 0;
							repoFilters = repoFilters.filter((a) => a.o != 'lang');
						}}
					/>
				</div>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-missing-attribute -->
				{#if filtersShown}
					<div class="horiz v-center" style="width: 100%;">
						<!-- svelte-ignore a11y-missing-attribute -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<img
							style="border-radius:5px; opacity: {!IncludeForks ? '1' : '0.2'};"
							src={fork}
							on:click={() => toggleOption({ o: 'fork', d: false })}
						/>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="horiz"
							style="border-radius:10px; padding:4px;background-color: {filterUnit == 'none'
								? 'rgba(0,0,0,0)'
								: 'rgba(200,200,0,0.1)'};"
						>
							<img
								style="border-radius:5px; opacity: {filterUnit != 'none' ? '1' : '0.2'};"
								src={calander}
								on:click={() => {
									filterUnit = filterUnit == 'none' ? '' : 'none';
								}}
							/>
							{#if filterUnit != 'none'}
								<div style="margin-right: 4px; display:flex; align-items:center">
									Updated in the last
								</div>
								<input type="number" bind:value={filterValue} min="0" />
								<select bind:value={filterUnit}>
									<option value="days">
										Day{#if filterValue != 1}s{/if}
									</option>
									<option value="months">
										Month{#if filterValue != 1}s{/if}
									</option>
									<option value="years">
										Year{#if filterValue != 1}s{/if}
									</option>
								</select>
							{/if}
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="horiz center"
							style="border-radius:10px; padding:4px;background-color: {!CodeFiltersShown
								? 'rgba(0,0,0,0)'
								: 'rgba(200,0,200,0.1)'};"
						>
							<img
								style="border-radius:5px; opacity: {CodeFiltersShown ? '1' : '0.2'};"
								src={code}
								on:click={() => {
									CodeFiltersShown = !CodeFiltersShown;
									if (!CodeFiltersShown) {
										repoFilters = repoFilters.filter((a) => a.o != 'lang');
									}
								}}
							/>
							{#if CodeFiltersShown}
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								{#each projects.langs as lang}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										class="chip"
										style="padding:2px 5px; background-color: {activeLangFilters.some(
											(a) => a.toLowerCase() == lang[0].toLowerCase()
										)
											? 'rgba(200,0,200,0.5)'
											: 'rgba(200,0,200,0.1)'};"
										on:click={() => {
											toggleOption({ o: 'lang', d: lang[0].toLowerCase() });
										}}
									>
										{lang[0]}
									</div>
								{/each}
							{/if}
						</div>
					</div>
				{/if}
				<Repos
					foo={filteredRepos ?? {
						all: []
					}}
					rawlangs={projects.langMap}
					userGithubLinks={false}
				/>
				<h2>Languages</h2>
				<p>Here are the languages I use and how much I use them</p>
				<Seg
					segments={projects.usedLangs}
					rawlangs={projects.langMap}
					total={addArr(projects.usedLangs.map((a) => a[1]))}
				/>
			{:catch a}
				<p>Failed to load contributions</p>
			{/await}
		{:else if data.resolved == 'f'}
			<h4>Fetching Contributions & Repositories</h4>
			<Load />
		{:else}
			<h4>Error fetching Contributions & Repositories</h4>
		{/if}
	</section>
	<section class="center"></section>
</main>

<style>
	input {
		background-color: rgba(0, 0, 0, 0);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0) #ffffff rgba(255, 255, 255, 0.1);
		border-width: 0.5px;
		border-radius: 10px 0px 0px 10px;
		font-family: 'Comfortaa', sans-serif;
		width: 20px;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	select {
		background-color: rgba(0, 0, 0, 0);
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) #ffffff rgba(255, 255, 255, 0);
		border-width: 0.5px;
		border-radius: 0px 10px 10px 0px;
		font-family: 'Comfortaa', sans-serif;
	}
	option {
		background-color: rgba(0, 0, 0, 0);
		color: #000000;
		border-color: rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) #ffffff rgba(255, 255, 255, 0.1);
		border-width: 1px;
		border-radius: 2px;
		font-family: 'Comfortaa', sans-serif;
	}
	.chip {
		font-size: 0.6rem;
		display: flex;
		align-items: center;
		height: 100%;
		margin-left: 5px;
		background-color: rgb(76, 76, 76);
		border-radius: 1rem;
		padding: 0px 5px;
		color: white;
		text-decoration: none;
	}

	hero {
		width: 100%;
	}
	section {
		display: block;
		margin: 0%;
		width: calc(100% - 30%);
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
	.v-center {
		display: flex;
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
	.vertical {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;
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
</style>
