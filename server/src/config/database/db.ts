import { client } from "./client";

export const connectMongo = async () => {
	await client
		.connect()
		.then(() => console.log("✅ MongoDB producer connected"))
		.catch((err) => console.warn("⚠️ MongoDB connect warning:", err));
	return client;
};
