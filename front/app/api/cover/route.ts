export async function GET(req: Request) {
	const id = new URL(req.url).searchParams.get("id");
	const resp = await fetch(`http://localhost:4000/api/manga/cover?id=${id}`);
	return new Response(resp.body, {
		headers: {
			"Content-Type": resp.headers.get("content-type") ?? "image/jpeg",
		},
	});
}
