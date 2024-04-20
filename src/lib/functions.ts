export async function gracefulFetch<T = any>(apiUrl: string, headers?: any, retryLimit = 5): Promise<T | undefined> {
	return await fetch(apiUrl, headers)
		.then((response) => response.json()).then(data => {
			if (data === "Data is still loading! check back in a few seconds") {
				if (retryLimit > 0) {
					console.log('Data is still loading, retrying fetch...');
					return new Promise(resolve => setTimeout(() => resolve(gracefulFetch(apiUrl, {}, retryLimit - 1)), 3000)); // wait 3 seconds before retrying
				} else {
					throw new Error('Retry limit reached, data is still loading.');
				}
			} else {
				return data; // data is ready, resolve with this data
			}
		})
		.catch(() => void 0);
}

