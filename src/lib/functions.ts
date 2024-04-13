export async function gracefulFetch<T = any>(apiUrl: string): Promise<T | undefined> {
	return await fetch(apiUrl)
		.then((response) => response.json())
		.catch(() => void 0);
}
