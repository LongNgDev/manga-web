// server.ts
import app from "./app";
import dotenv from "dotenv";
import { connectMongo } from "./config/database/db";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await connectMongo();
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
