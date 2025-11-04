import { Router, Request, Response } from "express";
import { client } from "../config/database/client";

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

export default router;
