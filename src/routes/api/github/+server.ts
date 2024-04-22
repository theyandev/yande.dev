import { env } from "$env/dynamic/private";
import { gracefulFetch } from "$lib/functions.ts";
import { json } from "@sveltejs/kit";
import {load as loadYAML} from "js-yaml"
const token = env.GIT_TOKEN ?? process.env.GIT_TOKEN
let done = false
let repos: any[] | any
let projects: any = []
let git: any = []
let langs: any[] = []
let a: any

const langYML = await (await fetch("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml")).text()
const langJSON: {[key:string]:any} = keysToLowercase(loadYAML(langYML) as any)
function keysToLowercase(obj: { [x: string]: any; }) {
    // Create a new object to store the transformed key-value pairs
    const newObj: { [x: string]: any; } = {};
  
    // Iterate over the keys of the original object
    Object.keys(obj).forEach(key => {
      // Convert each key to lowercase and use it to store the corresponding value
      newObj[key.toLowerCase()] = obj[key];
    });
  
    // Return the new object with all lowercase keys
    return newObj;
  }
function addArr(arr: number[]) {
    let t = 0
    arr.forEach(element => {

        t += element
    }
    );
    return t
}
let b = { repo: { all: repos }, langs: langs, cont: a, langMap: langJSON }
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
                total: addArr(Object.entries(repoLangs).map((a) => a[1]) as number[])
                , langs: repoLangs
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
    b = { repo: { all: repos }, langs: langs, cont: a, langMap : langJSON }
    done = true
}

 await updateInfo()

 export async function GET() {

    return json(done ? b : b)
}