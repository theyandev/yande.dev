import { gracefulFetch } from "$lib/functions.ts";
import { json } from "@sveltejs/kit";
let projects:any = []
let git:any = []
let a = {
    contributions: await (await fetch(`https://api.github.com/search/issues?q=author:theyande`)).json(),
    git: git
 }
async function updateInfo() {
    projects = await fetch(`https://api.github.com/search/issues?q=author:theyande`)
    .then((r) => r.json())
    .then((r) =>
        [...new Set(r.items.map((i: any) => {
            return i.repository_url
        }))] as string[])

        projects.forEach(async (repo:any) => {
            git.push(await gracefulFetch(repo))
         })

         a = {
            contributions: await (await fetch(`https://api.github.com/search/issues?q=author:theyande`)).json(),
            git: git
         }
}

await updateInfo()
setInterval(updateInfo,1000*60)

export async function GET() {
    return json(a)
}