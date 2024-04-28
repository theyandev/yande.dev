import { env } from "$env/dynamic/private";
import { gracefulFetch } from "$lib/functions.ts";
import { json } from "@sveltejs/kit";
import { load as loadYAML } from "js-yaml"
const token = env.GIT_TOKEN ?? process.env.GIT_TOKEN
let done = false
let repos: any[] | any
let projects: any = []
let git: any = []
let langs: any[] = []

const langYML = await (await fetch("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml")).text()
const langJSON: { [key: string]: any } = keysToLowercase(loadYAML(langYML) as any)
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
let b: any = {}
async function updateInfo() {
    const contributions = await gracefulFetch("https://api.github.com/search/issues?q=author:theyande", { headers: { Authorization: `token ${token}` } })
    repos = (await gracefulFetch("https://api.github.com/users/theyande/repos", { headers: { Authorization: `token ${token}` } }))
        .toSorted((a: any, b: any): any => Date.parse(b.updated_at) - (Date.parse(a.updated_at)))
    langs = []
    await repos.forEach(async (_: any, index: string | number, repos: { [x: string]: any; }) => {
        const repoLangs = await gracefulFetch(repos[index].url + "/languages", { headers: { Authorization: `token ${token}` } })
        const repoCommits = await gracefulFetch(repos[index].url + "/commits?author=theyande", {
            headers: { Authorization: `token ${token}` }
        });
        Object.entries(repoLangs).forEach((lang: any[]) => {
            let index = langs.map((lang: any) => lang[0]).indexOf(lang[0])
            if (index != -1) {
                langs[index][1] += lang[1]
            } else {
                langs.push(lang)
            }
        });
        repos[index] = {
            ...repos[index], languages: {
                total: addArr(Object.entries(repoLangs).map((a) => a[1]) as number[])
                , langs: repoLangs
            },
            commits: repoCommits
        }


    })
    projects =
        [...new Set(contributions.items.map((i: any) => {
            return i.repository_url
        }))] as string[]
    git = [];

    const fetchPromises = projects.map(async (repo: string) => {
        const repoLangs = await gracefulFetch(repo + "/languages", {
            headers: { Authorization: `token ${token}` }
        });

        const repoCommits = await gracefulFetch(repo + "/commits?author=theyande", {
            headers: { Authorization: `token ${token}` }
        });

        const repoData = await gracefulFetch(repo, {
            headers: { Authorization: `token ${token}` }
        });

        return {
            ...repoData,
            languages: {
                //@ts-ignore
                total: addArr(Object.entries(repoLangs).map((a) => a[1])),
                langs: repoLangs
            },
            commits: repoCommits
        };
    });

    // Use Promise.all to wait for all fetchPromises to resolve
    const gitData = await Promise.all(fetchPromises);
    git.push(...gitData); // Spread syntax to push all elements of gitData array

let usedLangs: any[][] = [];
const a = [...repos, ...git];
a.forEach((repo) => {
    console.log(Object.entries(repo.languages.langs));
    
    if (repo.fork) if (repo.commits.length < 1) return
    Object.entries(repo.languages.langs).forEach((lang: any[]) => {
        let index = usedLangs.map((lang: any) => lang[0]).indexOf(lang[0])
        if (index != -1) {
            usedLangs[index][1] += lang[1]
        } else {
            usedLangs.push(lang)
        }
    });
})
usedLangs.sort((a,b) => a[1] - b[1])
    b = {
        repo: { all: repos }, langs: langs, cont: {
            contributions,
            git: git
        }, langMap: langJSON, usedLangs
    }


    done = true
}

await updateInfo()

export async function GET() {

    return json(done ? b : b)
}