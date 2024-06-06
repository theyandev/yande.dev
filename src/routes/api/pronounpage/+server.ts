import { gracefulFetch } from "$lib/functions.ts"
import { json } from "@sveltejs/kit"

const pPage = await gracefulFetch('https://en.pronouns.page/api/profile/get/yande.dev?version=2');

export async function GET() {
    return json(pPage)
}
