import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		localPatterns: [
			{
				pathname: "/api/cover",
			},
		],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
				pathname: "/api/manga/**",
			},
		],
	},
};

export default nextConfig;
