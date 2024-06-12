import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { timeString } from "../utils/time_parser.ts";

export default function ({ time }: { time: number }) {
	const target = new Date(time);
	const now = useSignal(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			if (now.value > target) {
				clearInterval(timer);
			}
			now.value = new Date();
		}, 1_000);
		return () => clearInterval(timer);
	}, [time]);

	const timeLeft = Math.floor(target.getTime() - now.value.getTime());

	return <p class="text-2xl">{timeString(timeLeft)}</p>;
}
