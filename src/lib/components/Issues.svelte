<script>
	// @ts-nocheck

	import { cubicOut } from 'svelte/easing';
	import issueClosed from '$lib/images/issues/closed.svg';
	import issueOpen from '$lib/images/issues/open.svg';
	import issueNp from '$lib/images/issues/not-planned.svg';
	import pullClosed from '$lib/images/prs/closed.svg';
	import pullOpen from '$lib/images/prs/open.svg';
	import pullMerged from '$lib/images/prs/merged.svg';
	import collapse from '$lib/images/collapsed/no.svg';
	import uncollapse from '$lib/images/collapsed/yes.svg';
	import changed from '$lib/images/files/changed.svg';
	import comments from '$lib/images/files/comments.svg';
	import commits from '$lib/images/files/commits.svg';
	import { slide, fade, scale, draw, blur, crossfade, fly } from 'svelte/transition';

	// Custom transition to animate height from 0 to auto
	// @ts-ignore
	function expand(node, { duration, easing = cubicOut }) {
		// Include an easing parameter with a default value
		return {
			duration,
			easing, // Apply the easing function to the transition
			css: (/** @type {number} */ t) => `height: ${t * node.scrollHeight}px;`
		};
	}
	/**
	 * @type {any}
	 */
	export let foo;

	/**
	 * @type {{ offsetWidth: any; }}
	 */
	let stuffElement;

	/**
	 * @param {any} issue
	 */
	function getPath(issue) {
		if (issue.pull_request) {
			if (issue.state == 'open') return pullOpen;
			if (issue.pull_request.merged_at) return pullMerged;
			if (issue.state == 'closed') return pullClosed;
		} else {
			if (issue.state == 'open') return issueOpen;
			if (issue.state_reason == 'completed') return issueClosed;
			if (issue.state_reason == 'not_planned') return issueNp;
		}
	}
	/**
	 *@type {{[index:number]: boolean}}
	 */
	let toggledStates = {};
	let toggledComments = {};
	/**
	 * @param {number} id
	 */
	function toggleItem(id) {
		// If the item doesn't exist in the object, initialize it with false
		if (!(id in toggledStates)) {
			toggledStates[id] = false;
		}
		// Toggle the state
		toggledStates[id] = !toggledStates[id];
	}
	function toggleCmt(id) {
		// If the item doesn't exist in the object, initialize it with false
		if (!(id in toggledComments)) {
			toggledComments[id] = false;
		}
		// Toggle the state
		toggledComments[id] = !toggledComments[id];
	}
</script>

<div class="stuff" bind:this={stuffElement}>
	{#each foo as issue (issue.id)}
		<main class="vertical">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="vertical overflow" transition:slide>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

				<div class="center-h {toggledStates[issue.id] ? 'ma' : ''}">
					<img class="icon" src={getPath(issue)} alt="" />
					<h1><a href={issue.html_url}>{issue.title}</a></h1>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img
						class="icon-s"
						src={toggledStates[issue.id] ? collapse : uncollapse}
						on:click={() => toggleItem(issue.id)}
					/>
					<div class="stats horiz">
						<div class="horiz" tooltip={`${issue.pullData?.comments ?? issue.comments} Comments`}>
							<img class="icon-ss" src={comments} alt="" />
							<s></s>
							{issue.pullData?.comments ?? issue.comments}
						</div>

						{#if issue.pull_request}
							<spac></spac>
							<div class="horiz" tooltip={`${issue.pullData.commits} Commits`}>
								<img class="icon-ss" src={commits} alt="" />
								<s></s>
								{issue.pullData.commits}
							</div>
							<spac></spac>
							<div
								class="horiz"
								tooltip={`${issue.pullData.changed_files} Changed files with ${issue.pullData.additions} additions and ${issue.pullData.deletions} deletions`}
							>
								<img class="icon-ss" src={changed} alt="" />
								<s></s>
								<div>{issue.pullData.changed_files}</div>
								<s></s>
								<div class="add">+{issue.pullData.additions}</div>
								<s></s>
								<div class="sub">-{issue.pullData.deletions}</div>
							</div>
						{/if}
					</div>
				</div>
				<!-- svelte-ignore a11y-no-static-element-interactions -->

				<div class="vertical">
					{#if toggledStates[issue.id]}
						<div class="issue-body" transition:slide>
							{@html issue.parsedBody}
						</div>
						<spacer transition:slide />
						<!-- svelte-ignore a11y-missing-attribute -->
						<div transition:slide>
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<div class="horiz center-h">
								<p>Comments</p>
								<img
									class="icon-s"
									src={toggledComments[issue.id] ? collapse : uncollapse}
									on:click={() => toggleCmt(issue.id)}
								/>
							</div>
							
							
								{#if toggledComments[issue.id]}
								<div transition:slide>
									<spacer></spacer>
									{#each issue.commentlist as cmt}
									<div class="horiz center-h"><img class="pfp" src={cmt.user.avatar_url} alt="">{cmt.user?.login}</div>
										<comment class="vertical">
											{@html cmt.parsedbody}
										</comment>
									{/each}
								</div>
								{/if}
							
						</div>
					{/if}
				</div>
			</div>
		</main>
	{/each}
</div>

<style>
comment {
	border-width: 10px;
	border-color: blue;
}
	.pfp{
		height:2em;
		border-radius: 50%;
	}
	spacer {
		height: 2px;
		margin: 8px 0px -4px 0px;
		background-color: black;
		width: 100%;
	}

	a {
		color: white;
	}
	.add {
		color: lime;
	}
	.sub {
		color: lightcoral;
	}

	.stats {
		align-self: flex-end;
	}
	.ma {
		margin-bottom: 10px;
	}
	.center-h {
		display: flex;
		align-items: center;
		transition: margin 0.5s;
	}

	.stuff {
		display: flex;
		flex-direction: column;
		gap: 0px;
		width: 100%;

		animation: long 1s cubic-bezier(0.39, 0.17, 0.32, 1) 0.5s 1 forwards;
	}
	.stuff > main {
		transition: transform 0.5s ease;
	}
	.stats {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	spac {
		margin: 0px 5px;
	}
	s {
		margin: 0px 2px;
	}
	.icon {
		height: 1.4em;
		/* border-radius: 50%; */
		margin: 0px 5px;
	}
	.icon-s {
		height: 1.5em;
		/* border-radius: 50%; */
		/* margin-right: 5px; */
	}
	.icon-ss {
		height: 1em;
		/* border-radius: 50%; */
		/* margin-right: 5px; */
	}
	.name {
		height: min-content;
		margin: 0%;
		grid-area: header;
	}
	.owner {
		font-size: 10px;
	}
	main {
		display: block;
		position: relative;
		min-height: 0rem;
		border-color: rgb(92, 92, 92);
		border-width: 2px;
		border-style: solid;
		border-radius: 0px;
		animation: b 1s cubic-bezier(0.39, 0.17, 0.32, 1) 0.5s 1 forwards;
		padding: 5px;
	}
	.overflow {
		overflow: hidden;
	}
	.vertical {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;
	}
	h1 {
		margin: 0px;
		font-size: 1.2em;
	}
	@keyframes long {
		from {
			gap: 0px;
		}
		to {
			gap: 10px;
		}
	}
	@keyframes b {
		from {
			border-radius: 0px;
		}
		to {
			border-radius: 5px;
		}
	}
</style>
