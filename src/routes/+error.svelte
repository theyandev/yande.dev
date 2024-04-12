<script lang="ts">
	import { page } from '$app/stores';
	let quotes: { [key: number]: string[] } = {
		404: [
			'Well, this is interesting.',
			'YOU SHALL NOT PASS!!!!!',
			"Ya goofed up, didn't you?",
			'Lost in the digital wilderness.',
			'Oops, something went wrong.',
			'Looks like we hit a dead end.',
			'Nothing seems to be here.',
			'Hmmm... this page seems to be missing.',
			"The page you're looking for vanished.",
			"Looks like we're on a wild goose chase.",
			'Bruh.',
			'This deserves a 🥔.',
			'🥔?',
			'*Violent microwave sounds*',
			'404.',
			'Redguy would love to see this.',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			'Toe.'
		],
        500: [
            "uh oh"
        ]
	};
</script>

<div>
	<h1>{$page.status}</h1>
	<p>{quotes[$page.status][Math.floor(Math.random() * quotes[$page.status].length)]}</p>
</div>

<style>
    div {
  background-color: #2a2a2a;
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
