import { Router, Request, Response } from "express";

import manga from "./manga";

const router: Router = Router();

router.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "ok" });
});

// redirect all route to manga
router.use("/manga", manga);

export default router;
