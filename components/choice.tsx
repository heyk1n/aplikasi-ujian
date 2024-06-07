import { type JSX } from "preact";

interface Choice {
	onClick: JSX.MouseEventHandler<HTMLButtonElement>;
	id: number;
	label: string;
}

export default function ({ onClick, label }: Choice) {
	return (
		<button onClick={onClick} class="bg-black w-full rounded-full p-3 grid">
			<p class="text-white place-self-center">{label}</p>
		</button>
	);
}
