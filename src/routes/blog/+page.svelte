<script lang="ts">
	export let data;
    import TimeAgo from 'javascript-time-ago'
    import en from 'javascript-time-ago/locale/en'
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
</script>
<div>
<h1>Blog post thingys</h1>
<p>my random thoughts idk read them if you want</p>
</div>
<div>
	{#each data.blogs.posts as blog}
		<div class="post">

            <p class="date">{timeAgo.format(new Date(blog.date))} {(new Date() - new Date(blog.date)) / (1000 * 3600) > 24 ? "(" + timeAgo.format(new Date(blog.date), "twitter") + ")" : ""} </p>
			{@html blog.content}
		</div>
	{/each}
</div>

<style>
	.post {
		border: 1px solid #5151513d;
		border-left: 4px solid #71717181;
		border-radius: 8px;
		padding: 2px 5px;
		margin: 10px 5px;
	}
</style>
