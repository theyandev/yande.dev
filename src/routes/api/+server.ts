import { json } from "@sveltejs/kit";

const modules = import.meta.glob('./*.ts')



export function GET() {
	return json({
        v:1,
        routes: ["/api","/api/github"]
     })
}