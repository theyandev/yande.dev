import { env } from "$env/dynamic/private";
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
        git = []
        projects.forEach(async (repo:any) => {
            const repoRes = await gracefulFetch(repo,{headers: {Authorization: `token ${env.GIT_TOKEN}`}})
            const repoLangs = await gracefulFetch(repo + "/languages",{headers: {Authorization: `token ${env.GIT_TOKEN}`}})
          
            git.push({...( repoRes ),languages:{total:Object.entries(repoLangs).map(([key, value]) => value).toSpliced(2).reduce(
                (accumulator:any, currentValue:any) => accumulator + currentValue),langs:Object.entries(repoLangs).map(([key, value]) => [key, value]).toSpliced(2)}})
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