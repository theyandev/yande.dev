import { gracefulFetch } from "$lib/functions.ts"
import { json } from "@sveltejs/kit"
let serverIds = ["1141222489582735360", "806602307750985799"]
let servers: any[] = []
async function update() {
    servers = []
     serverIds.map(async (server) => {
        const res = await gracefulFetch(`https://discord.com/api/guilds/${server}/widget.json`)
        servers.push(res)
    })
}

await update()


export async function GET() {
    return json(servers)
}