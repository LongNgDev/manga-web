export async function GET() {
	const resp = await fetch(
		`https://api.mangadex.org/manga?limit=20&availableTranslatedLanguage[]=en&availableTranslatedLanguage[]=vi&excludedTags[]=5920b825-4181-4a17-beeb-9918b0ff7a30&excludedTags[]=65761a2a-415e-47f3-bef2-a9dababba7a6&excludedTags[]=2bd2e8d0-f146-434a-9b51-fc9ff2c5fe6a&order[latestUploadedChapter]=desc&includes[]=artist&includes[]=author&includes[]=tag&includes[]=cover_art`,
		{ next: { revalidate: 3600 } }
	);

	if (!resp.ok) {
		return new Response("Failed to fetch MangaDex data", {
			status: resp.status,
		});
	}

	const data = await resp.json();
	return Response.json(data.data, {
		status: resp.status,
		headers: {
			// "Content-Type": resp.headers.get("content-type") ?? "",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
