<script lang="ts">
	import Og from "$lib/components/Og.svelte";
import {onMount} from "svelte"
  onMount(()=>
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ")

</script>
<svelte:head>
	<Og title="nothing interesting here" description="click if you DARE"/>
</svelte:head>