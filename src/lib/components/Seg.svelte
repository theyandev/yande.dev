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

	function contranst(hexColor) {
		// Convert hex color to RGB
		const r = parseInt(hexColor.slice(1, 3), 16);
		const g = parseInt(hexColor.slice(3, 5), 16);
		const b = parseInt(hexColor.slice(5, 7), 16);

		// Calculate the luminance of the color
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

		// If the luminance is lower than the threshold, use white; otherwise, use black
		return luminance < 150 ? '#FFFFFF' : '#000000';
	}
</script>

<div class="segmented-bar">
	{#each segments as segment}
		<div
			tooltip={segment[0] + ' ' + Math.round((segment[1] / total) * 100) + '%' + ` ( ${Intl.NumberFormat('en-US', {
				notation: "compact",
				maximumFractionDigits: 1
			  }).format(segment[1])} characters )`}
			style="width: {(segment[1] / total) * 100}%; color:{contranst(
				rawlangs[segment[0].toLowerCase()]?.color
			)};background-color: {rawlangs[segment[0].toLowerCase()]?.color};"
		>
			{(segment[1] / total) * 100 > 3 ? Math.round((segment[1] / total) * 100) + '%' : ''}
		</div>
	{/each}
</div>

<style>
	.segmented-bar {
		width: 20%;
		display: flex;
		width: 0px;
		height: 30px;
		animation: long 1s cubic-bezier(0.39, 0.17, 0.32, 1) 0.5s 1 forwards;
	}
	.segmented-bar > div {
		position: relative;
		transition: all 0.5s;
		display: flex;
		align-items: center;
		justify-content: center;

		
	}
	.segmented-bar > div:first-child {
		border-radius: 15px 0px 0px 15px;
		border-right: solid 2px rgb(255, 255, 255);
	}
	.segmented-bar > div:not(:first-child):not(:last-child) {
		border-left: solid 2px rgb(255, 255, 255);
		border-right: solid 2px rgb(255, 255, 255);
	}
	.segmented-bar > div:last-child {
		border-radius: 0px 15px 15px 0px;
		border-left: solid 2px rgb(255, 255, 255);
	}

	.segmented-bar > div:only-child {
		border-radius: 2px 2px 2px 2px;
		
	}
	.segmented-bar > div {
		height: 100%;
	}
	.segmented-bar > div:hover {
		height: calc(100% + 20px);
		transform: translateY(-10px);
	}
	.segmented-bar > div:first-child:hover {
		border-radius: 25px 10px 10px 25px;
	}

	.segmented-bar > div:not(:first-child):not(:last-child):hover {
		border-radius: 10px;
	}

	.segmented-bar > div:last-child:hover {
		border-radius: 10px 25px 25px 10px;
	}

	.segmented-bar > div:only-child:hover {
		border-radius: 25px;
	}
	@keyframes long {
		from {
			width: 0px;
			left: 50%;
		}
		to {
			width: calc(100% - 10px);
			left: 5px;
		}
	}
</style>
