import express, { NextFunction, Request, Response, Application } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes";

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
// mount all route under /api
app.use("/api", routes);

// optional: handle preflight explicitly (some hosts need this)
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Methods",
		"GET,POST,PUT,PATCH,DELETE,OPTIONS"
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");
	if (req.method === "OPTIONS") return res.sendStatus(204);
	next();
});

// Health check
app.use("/health", (_req: Request, res: Response) => {
	res.status(200).json({ status: "OK" });
});

// 404
app.use((_req: Request, res: Response) => {
	res.status(404).json({ error: "Not Found" });
});

// error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.message);
	res
		.status(err.status || 500)
		.json({ error: err.message || "Internal Error" });
});

export default app;
