<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { page, navigating } from '$app/stores';
</script>

<div class="app">
	<Header />
	
	
		{#if $navigating}
	<div class="navigatoing"><br><br><br><br>navigating to {$navigating.to?.url.pathname}</div>

	
	
{/if}
<main><slot /></main>	
    
	<footer>
		<p>yes yes very website</p>
	</footer>
</div>

<style>

	.navigatoing {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
