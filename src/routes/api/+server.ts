import { json } from "@sveltejs/kit";
// import { readdirSync } from "fs";

// const paths = readdirSync("./src/routes/api").filter((path) => !path.startsWith("+")).map((path) => `/api/${path}`)
export function GET() {
        return json({
                v: 1.2,
        })
}
