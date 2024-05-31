
export const load = async ({ fetch, params }) => {

    const res = await fetch(`/api/blog`);
    const item = JSON.parse(await res.text())

    return {

        blogs: item,

    };
};