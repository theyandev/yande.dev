<script>
	// @ts-nocheck

	/**
	 * @type {any[]}
	 */
	export let segments = [];

	/**
	 * @type any
	 */
	export let rawlangs = {};
	export let total = 0;
</script>

<div class="segmented-bar">
	{#each segments as segment}
		<div
			tooltip={segment[0] + ' ' + Math.round((segment[1] / total) * 100) + '%'}
			style="width: {(segment[1] / total) * 100}%; background-color: {rawlangs[
				segment[0].toLowerCase()
			]?.color};"
		></div>
	{/each}
</div>

<style>
	.segmented-bar {
		position: absolute;
		bottom: -4px;
		left: 5px;
		display: flex;
		width: 0px;
		height: 6px;
		animation: long 1s cubic-bezier(.39,.17,.32,1) 0.5s 1 forwards;
	}
	.segmented-bar > div {
		transition: all 0.5s;
	}
	.segmented-bar > div:first-child {
		border-radius: 2px 0px 0px 2px;
	}

	.segmented-bar > div:last-child {
		border-radius: 0px 2px 2px 0px;
	}

	.segmented-bar > div:only-child {
		border-radius: 2px 2px 2px 2px;
	}
	.segmented-bar > div {
		height: 100%;
	}
	.segmented-bar > div:hover {
		height: 10px;
		transform: translateY(-2px);
	}
	.segmented-bar > div:first-child:hover {
		border-radius: 4px 2px 2px 4px;
	}

	.segmented-bar > div:not(:first-child):not(:last-child):hover {
		border-radius: 2px;
	}

	.segmented-bar > div:last-child:hover {
		border-radius: 2px 4px 4px 2px;
	}

	.segmented-bar > div:only-child:hover {
		border-radius: 4px;
	}
	@keyframes long {
	from {width:0px;
		left: 50%;
	}
	to {width: calc(100% - 10px);
		left: 5px;
		
	}
	}
</style>
