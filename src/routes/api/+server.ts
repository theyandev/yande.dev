import { json } from "@sveltejs/kit";

export function GET() {
	return json({
        v:1.1,
        routes: ["/api","/api/github"]
     })
}
