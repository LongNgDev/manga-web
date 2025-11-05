"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function Slider() {
	const autoplay = useRef(
		Autoplay({
			delay: 5000,
		})
	);

	return (
		<Carousel
			className="flex flex-col w-full m-auto bg-amber-700/10"
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[autoplay.current]}
			onMouseEnter={() => autoplay.current.stop()}
			onMouseLeave={() => autoplay.current.play()}
		>
			<CarouselContent>
				{Array.from({ length: 10 }).map((_, index) => (
					<CarouselItem key={index}>
						<div>
							<Card className="rounded-none h-90">
								<CardContent className="flex items-center justify-center w-full h-full p-6">
									<span className="text-4xl font-semibold">{index + 1}</span>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="absolute bottom-0 flex items-center justify-end w-full gap-4 px-8">
				<p>No.1</p>
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
