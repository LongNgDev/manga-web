"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

type Tags = {
	attributes: {
		name: Record<string, string>;
	};
};

type MetaData = {
	id: string;
	attributes: {
		title: Record<string, string>;
		altTitles: Array<Record<string, string>>;
		description: Record<string, string>;
		tags: Array<Tags>;
	};
	relationships: Array<{
		type: string;
		attributes: {
			name?: string;
		};
	}>;
};

function LatestUpdated() {
	const [latest, setLatest] = useState<MetaData[]>([]);

	useEffect(() => {
		const fetch_latest = async () => {
			const res = await fetch(`/api/latest`);
			if (!res.ok) return;

			const data = await res.json();
			console.log();
			setLatest(data);
		};

		fetch_latest();
	}, [latest]);

	return (
		<div className="w-full p-6">
			<div className="grid w-full grid-cols-2 row-auto">
				{latest.map((manga, index) => (
					<div key={index}>
						<Card>
							<CardContent>
								<div>Image</div>
								<div>{Object.values(manga.attributes.title)}</div>
								<div>
									{manga.attributes.altTitles.find((t) => t.en)?.en ||
										manga.attributes.altTitles.find((t) => t.vi)?.vi}
								</div>
								<div>{manga.attributes.description.en}</div>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}

export default LatestUpdated;
