import { Router, Request, Response } from "express";
import { client } from "../database/client";
import { Readable } from "node:stream";

const router: Router = Router();

const db = client.db("manga-web");
const col = db.collection("raw_metadata");

router.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});

router.get("/latest_updated", async (_req: Request, res: Response) => {
	try {
		const data = await col.find({}).toArray();

		if (!data) return res.status(500).json({ msg: "Data missing!" });

		return res.status(200).json(data);
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ msg: "Database error" });
	}
});

router.get("/cover", async (req: Request, res: Response) => {
	const manga_id = req.query.id;
	try {
		const data = await col.findOne({ id: manga_id });

		if (!data) return res.status(500).json({ msg: "Data missing!" });

		const cover_fn = data.relationships.find(
			(res: any) => res.attributes?.fileName
		)?.attributes.fileName;

		const cover = await fetch(
			`https://uploads.mangadex.org/covers/${manga_id}/${cover_fn}`
		);
		if (!cover.ok) return res.status(404).send("Not found");

		// pass through useful headers
		const ct = cover.headers.get("content-type") ?? "image/jpg";
		const cl = cover.headers.get("content-length");
		res.setHeader("Content-Type", ct);
		if (cl) res.setHeader("Content-Length", cl);
		const cache = cover.headers.get("cache-control");
		if (cache) res.setHeader("Cache-Control", cache);

		// Convert Web stream -> Node stream
		Readable.fromWeb(cover.body as any).pipe(res);
	} catch (err) {
		console.error("⚠️ Error fetching data:", err);
		return res.status(500).json({ msg: "Database error" });
	}
});

export default router;
