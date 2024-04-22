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
		<div tooltip={segment[0] +" " + Math.round((segment[1] / total) * 100)+ "%"} style="width: {(segment[1] / total) * 100}%; background-color: {rawlangs[segment[0].toLowerCase()]?.color};"></div>
	{/each}
</div>

<style>
	.segmented-bar {
		position: absolute;
		bottom: -2px;
        left:10px ;
		display: flex;
		width: calc(100% - 20px);
		height: 2px;
		
	}


	.segmented-bar > div {
		height: 2px;
		transition: all 0.5s;
	}
	.segmented-bar > div:hover {
		height: 6px;
		transform: translateY(-2px);
	}
</style>
