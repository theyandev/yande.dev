
import type { PageLoad } from "./$types"
export const load: PageLoad = async ({ fetch, params }) => {

    const res = await fetch(`/api/github`);
    const item = JSON.parse(await res.text())

    return {

        projects: item,
        resolved: `t`,

    };
};