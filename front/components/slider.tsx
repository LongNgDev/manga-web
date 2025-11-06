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
import { Badge } from "./ui/badge";

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
			// onMouseLeave={() => autoplay.current.play()}
		>
			{/*  */}
			<CarouselContent>
				{top10 &&
					top10.slice(10, 20).map((item, index) => (
						<CarouselItem key={index}>
							<div className="relative min-h-[1000px] h-dvh">
								<Image
									src={`/api/cover?id=${item.id}`}
									alt="background cover"
									className="absolute top-0 left-0 -translate-y-1/4 -z-10 brightness-35"
									fill
									objectPosition="top"
									objectFit="cover"
									sizes="100vw"
									preload={true}
								/>
								<Card className="relative h-[550px] rounded-none w-full p-10 bg-linear-to-t from-0% from-background via-background/70 via-50% to-background/10 border-0">
									<CardHeader className="items-center"></CardHeader>
									<CardContent className="flex items-start w-full h-full gap-4">
										<Image
											src={`/api/cover?id=${item.id}`}
											alt="cover"
											height={250}
											width={250}
											className="object-cover h-full"
											preload={true}
										/>

										<div className="flex flex-col justify-start w-full h-full gap-2">
											<div className="flex items-center justify-between w-ful">
												<div className="flex flex-col">
													<h2 className="text-4xl font-bold">
														{Object.values(item.attributes.title)}
													</h2>

													<h2 className="text-2xl ">
														{item.attributes.altTitles.find((t) => t.en)?.en ||
															item.attributes.altTitles.find((t) => t.vi)?.vi}
													</h2>
												</div>
											</div>

											<div className="flex gap-2">
												{item.attributes.tags.map((tag, index) => (
													<Badge
														key={index}
														className="py-1 font-semibold tracking-wide uppercase"
														variant={"secondary"}
													>
														{tag.attributes.name.en}
													</Badge>
												))}
											</div>

											<p className="w-11/12 pt-4 tracking-wide line-clamp-3">
												{item.attributes.description.en || ""}
											</p>

											<div className="flex items-end gap-4 italic font-bold tracking-wide grow">
												{item.relationships.map((item, index) => {
													return (
														<div key={index}>
															{["author", "artist"].includes(item.type) ? (
																<h3>
																	<span className="font-normal capitalize">
																		{item.type}:&nbsp;
																	</span>
																	{item.attributes.name}
																</h3>
															) : (
																<></>
															)}
														</div>
													);
												})}
											</div>
										</div>
										<h2 className="px-4 pt-4 text-2xl font-semibold tracking-wide text-center w-fit">
											No.{index + 1}
										</h2>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
			</CarouselContent>
			<div className="absolute bottom-0 flex items-center justify-end w-full gap-4 px-10">
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
