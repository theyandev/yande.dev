import { error } from '@sveltejs/kit'; import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch(`/api/github`);
    const item = JSON.parse(await res.text())
    const repos = [...new Set([...item.repo.all, ...item.cont.git])].filter((repo) => {
        console.log(repo.full_name)
        return repo.owner?.login.toLowerCase() == params.user.toLowerCase()
    })

    if (repos.length != 0) {
        const user = await (await fetch(repos[0].owner.url)).json()
        console.log(user)
        return { repos, res: item, user };
    }
    error(404, 'Not found');
};