import { gracefulFetch } from "$lib/functions";
import { json } from "@sveltejs/kit";
let projects:string[] = await fetch(`https://api.github.com/search/issues?q=author:theyande`)
    .then((r) => r.json())
    .then((r) =>
        [...new Set(r.items.map((i: any) => {
            return i.repository_url
        }))] as string[])

let git:any = []

projects.forEach(async (repo) => {
     git.push(await gracefulFetch(repo))
  })

let a = {
    contributions: await (await fetch(`https://api.github.com/search/issues?q=author:theyande`)).json(),
    git: git
 }
export async function GET() {
    return json(a)
}
