

export async function gracefulFetch<T = any>(apiUrl: string, headers?: any, retryLimit = 5): Promise<T | undefined> {
	return await fetch(apiUrl, headers)
		.then((response) => response.json()).then(data => {

			return data;

		})
}


