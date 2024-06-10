import { type JSX } from "preact";

interface Choice {
	onClick: JSX.MouseEventHandler<HTMLButtonElement>;
	id: number;
	label: string;
	selected: boolean;
}

export default function ({ onClick, label, selected }: Choice) {
	return (
		<button
			onClick={onClick}
			class={`bg-${
				selected ? "white outline outline-black" : "black"
			} w-full rounded-full p-3 grid`}
		>
			<p class={`text-${selected ? "black" : "white"} place-self-center`}>
				{label}
			</p>
		</button>
	);
}
