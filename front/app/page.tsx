import LatestUpdated from "@/components/latest_updates";
import { Slider } from "@/components/slider";

export default function Home() {
	return (
		<div className="w-dvw h-dvh">
			<main className="relative w-full max-w-[1440px] m-auto h-full">
				{/* Top 10 section */}
				<Slider />

				{/* Latest Update Section */}
				<LatestUpdated />
			</main>
		</div>
	);
}
