<!-- HTML Meta Tags -->

<script lang="ts">
	export let title = 'Yande.dev - :3';
	export let description = 'A website for a professional idiot who does coding';
	export let url = 'https://yande.dev';
	export let image = '';
</script>

<title>{title}</title>
<meta name="description" content={description} />

<!-- Open Graph  Tags -->
<meta property="og:url" content={url} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />


<!-- Twitter (x now :sob:) Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="yande.dev" />
<meta property="twitter:url" content={url} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />

