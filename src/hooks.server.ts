import type { Handle } from '@sveltejs/kit';

let initialized = false;

async function initializeSomeService(fetch: typeof globalThis.fetch) {
  console.log('Running initialization ');

  try {
    const response = await fetch('/api/blog'); // Use relative URL
    if (!response.ok) {
      throw new Error('Failed to fetch initialization data');
    }
    const data = await response.json();
    // console.log('Initialization data:', data);
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  if (!initialized) {
    initialized = true; // Set initialized to true before making the fetch call
    await initializeSomeService(event.fetch);
  }

//   console.log('Handling request to:', event.url.pathname);
  const response = await resolve(event);
  return response;
};
