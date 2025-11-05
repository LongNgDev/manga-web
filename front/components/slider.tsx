"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type MetaData = {
	id: string;
	attributes: {
		title: Record<string, string>;
		altTitles: Array<Record<string, string>>;
	};
};

export function Slider() {
	const [top10, setTop10] = useState<MetaData[]>([]);

	useEffect(() => {
		const fetch_top10 = async () => {
			const res = await fetch(`http://localhost:4000/api/manga/latest_updated`);
			if (!res.ok) return;

			const data = await res.json();
			setTop10(data);
		};

		fetch_top10();
	}, []);

	const autoplay = useRef(
		Autoplay({
			delay: 5000,
		})
	);

	return (
		<Carousel
			className="flex flex-col w-full m-auto h-[550px]"
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[autoplay.current]}
			onMouseEnter={() => autoplay.current.stop()}
			onMouseLeave={() => autoplay.current.play()}
		>
			<CarouselContent>
				{top10 &&
					top10.slice(0, 11).map((item, index) => (
						<CarouselItem key={index}>
							<div className="relative h-dvh">
								<div
									className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover -translate-y-1/4 brightness-40"
									style={{
										backgroundImage: `url(/api/cover/?id=${item.id})`,
									}}
								/>
								<Card className="relative h-[550px]  rounded-none w-full bg-accent/0">
									<CardHeader>
										<h2>No.{index + 1}</h2>
									</CardHeader>
									<CardContent className="flex items-center justify-between w-full h-full p-6">
										<Image
											src={`/api/cover?id=${item.id}`}
											alt="cover"
											width={200}
											height={200}
										/>

										<span className="text-4xl font-semibold">
											{Object.values(item.attributes.title)}
										</span>

										<span className="text-2xl font-semibold">
											{item.attributes.altTitles.find((t) => t.vi)?.vi ||
												item.attributes.altTitles.find((t) => t.en)?.en}
										</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
			</CarouselContent>
			<div className="absolute bottom-0 flex items-center justify-end w-full gap-4 px-8">
				<CarouselPrevious
					className="relative left-0 translate-none size-12"
					variant={"ghost"}
				/>
				<CarouselNext
					className="relative right-0 translate-none size-12"
					variant={"ghost"}
				/>
			</div>
		</Carousel>
	);
}
