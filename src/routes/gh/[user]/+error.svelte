<script lang="ts">
	import { page } from '$app/stores';
	let quotes: { [key: number]: string[] } = {
		404: ['Usr: not found', 'nobody here', 'person doesnt exist here'],
		500: ['uh oh']
	};
</script>

<div>
	<h1>{$page.status}</h1>
	<p>{quotes[$page.status][Math.floor(Math.random() * quotes[$page.status].length)]}</p>
	<img src="https://cataas.com/cat" style="height: 400px; border-radius:10px" alt="cat" />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		margin: 0;
		overflow: hidden;
		flex-direction: column;
	}

	h1 {
		font-size: 15rem;
		color: #f42020;
		text-shadow: 0 0 10px #f00;
		margin: 0;
		user-select: none;
	}
</style>
