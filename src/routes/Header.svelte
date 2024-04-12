<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import yande from '$lib/images/yande.svg';
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class="corner">
				<a href="/">
					<img src={yande} alt="Yande.dev" />
				</a> 
			</li>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li class="corner">
				<a href="https://github.com/theyande/">
					<img src={github} alt="GitHub" />
				</a>
			</li>
			<li class="corner">
				<a href="https://kit.svelte.dev">
					<img src={logo} alt="SvelteKit" />
				</a>
			</li>
		</ul>
		<svg style="transform: translateX(-1);" viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	/* .corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	} */

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgb(201, 201, 201);
		position: fixed;
		z-index: 10000;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		content: '';
		position: absolute;
		left: 50%;
		right: 0;
		border-radius: 2px;
		bottom: 10px; /* Adjust this value to control the distance of the underline from the text */
		height: 2px; /* Thickness of the underline */
		background-color: #000; /* Color of the underline */
		width: 0; /* Initial width of the pseudo-element */
		/* transition: width 0.5s ease; */
		animation: growUnderline 0.5s ease forwards;
	}
	@keyframes growUnderline {
		to {
			left: 0%;
			width: 100%;
		}
	}
	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
