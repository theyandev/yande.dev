import { json } from "@sveltejs/kit"

export async function GET() {
    return json({b:"A"})
}