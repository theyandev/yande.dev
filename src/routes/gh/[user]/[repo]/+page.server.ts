import { error } from '@sveltejs/kit'; import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch(`/api/github`);
    const item = JSON.parse(await res.text())
    const repo = [...new Set([...item.repo.all, ...item.cont.git])].find((repo) => {
        console.log(repo.full_name)
        return repo.full_name.toLowerCase() == `${params.user.toLowerCase()}/${params.repo.toLowerCase()}`
    })

    if (repo) {
        const user = await (await fetch(repo.owner.url)).json()
        let c: any[] = item.cont.contributions.items.filter((c: { url: string; }) => c.url.toLowerCase().includes(`${params.user.toLowerCase()}/${params.repo.toLowerCase()}`))


        return { repo: repo, issues: c, user };
    }
    error(404, 'Not found');
};