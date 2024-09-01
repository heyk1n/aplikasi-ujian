import { useState } from "preact/hooks";
import { UserType } from "../utils/user.ts";

export default function ({ token }: { token: string }) {
	const [username, setUsername] = useState<string>("");
	const [type, setType] = useState<UserType>(2);
	const [isCreating, setIsCreating] = useState<boolean>(false);

	return (
		<div class="grid place-items-center w-full space-y-4">
			<p>Create a new user!</p>
			<div class="flex w-full space-x-2">
				<input
					class="bg-slate-200 grow rounded-full outline-none text-center placeholder:text-gray-400 disabled:opacity-50 px-3 py-2"
					type="text"
					onInput={(input) => setUsername(input.currentTarget.value)}
					placeholder="Khi"
					disabled={isCreating}
				/>
				<button
					class={`disabled:opacity-50 place-self-center w-10 h-10 rounded-full ${
						type === 2 ? "bg-sky-200" : "bg-red-200"
					}`}
					onClick={() => setType(type === 2 ? 1 : 2)}
				/>
			</div>
			<button
				class="bg-black px-4 py-1 rounded-full text-white disabled:opacity-25"
				disabled={username.length < 3 || username.length > 25}
				onClick={() => setIsCreating(true)}
			>
				{isCreating ? "Creating..." : "Create!"}
			</button>
		</div>
	);
}
