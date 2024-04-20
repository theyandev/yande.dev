import { env } from "$env/dynamic/private";
import { gracefulFetch } from "$lib/functions.ts";
import { json } from "@sveltejs/kit";
const token = env.GIT_TOKEN ?? process.env.GIT_TOKEN


let repos: any[] | any

let projects: any = []
let git: any = []
let langs: any[] = []
let a: any

function addArr(arr: number[]) {
    let t = 0
    arr.forEach(element => {

        t += element
    }
    );
    return t
}
let b = { repo: { all: repos }, langs: langs, cont: a }
async function updateInfo() {
    a = {
        contributions: await (await fetch(`https://api.github.com/search/issues?q=author:theyande`)).json(),
        git: git
    }
    repos = (await gracefulFetch("https://api.github.com/users/theyande/repos", { headers: { Authorization: `token ${token}` } }))
        .toSorted((a: any, b: any): any => Date.parse(b.updated_at) - (Date.parse(a.updated_at)))

    for (let index = 0; index < repos.length; index++) {
        const repoLangs = await gracefulFetch(repos[index].url + "/languages", { headers: { Authorization: `token ${token}` } })

        repos[index] = {
            ...repos[index], languages: {
                total: addArr(Object.entries(repoLangs).map((a) => a[1]) as number[])
                , langs: repoLangs
            }
        }


    }
    projects = await fetch(`https://api.github.com/search/issues?q=author:theyande`)
        .then((r) => r.json())
        .then((r) =>
            [...new Set(r.items.map((i: any) => {
                return i.repository_url
            }))] as string[])
    git = []
    await projects.forEach(async (repo: any) => {
        const repoRes = await gracefulFetch(repo, { headers: { Authorization: `token ${token}` } })
        const repoLangs = await gracefulFetch(repo + "/languages", { headers: { Authorization: `token ${token}` } })

        git.push({
            ...(repoRes), languages: {
                total: Object.entries(repoLangs).map(([key, value]) => value).reduce(
                    (accumulator: any, currentValue: any) => accumulator + currentValue), langs: Object.entries(repoLangs)
            }
        })
    })

    a = {
        contributions: await (await fetch(`https://api.github.com/search/issues?q=author:theyande`)).json(),
        git: git
    }
    langs = []
    repos.forEach((element: any) => {
        Object.entries(element.languages.langs).forEach((lang: any[]) => {
            let index = langs.map((lang: any) => lang[0]).indexOf(lang[0])
            if (index != -1) {
                langs[index][1] += lang[1]
            } else {
                langs.push(lang)
            }
        });
    });

}

await updateInfo()
export async function GET() {
    b = { repo: { all: repos }, langs: langs, cont: a }
    return json(b)
}