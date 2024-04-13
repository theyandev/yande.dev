export async function gracefulFetch<T = any>(apiUrl: string,headers?:any): Promise<T | undefined> {
	return await fetch(apiUrl,headers)
		.then((response) => response.json())
		.catch(() => void 0);
}
