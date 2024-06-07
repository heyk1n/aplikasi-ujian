import tasksJson from "../tasks.ts";
import { define, kv, type User } from "../utils/fresh.ts";
import { page } from "@fresh/core";
import { getCookies } from "@std/http/cookie";

import Task from "../components/task.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		const tab = ctx.url.searchParams.get("tab");
		if (!tab) ctx.url.searchParams.set("tab", "tasks");

		const token = getCookies(ctx.req.headers)["token"];

		if (token) {
			const { value: userId } = await kv.get<string | bigint>([
				"sessions",
				token,
			]);
			const { value: user } = await kv.get<User>(["users", userId!]);

			return page({ user, tasks: tasksJson });
		} else {
			return page({ user: null });
		}
	},
});

export default define.page<typeof handler>(({ data }) => {
	const { user } = data;

	return (
		<div class="grid place-items-center w-dvw h-dvh bg-white p-10">
			{user
				? (
					<div class="w-full max-w-[600px] h-full max-h-72 space-y-4">
						<div class="flex w-full justify-between relative">
							<p class="font-bold text-3xl place-self-center select-none">
								Hello {user.username}!
							</p>
							<img
								src={user.avatar_url}
								class="bg-black w-12 h-12 rounded-full place-self-center"
							/>
						</div>
						<div class="bg-slate-300">
							<aside>
								<a href="/?tab=tasks">Tasks</a>
							</aside>
						</div>
						<div class="bg-gray-200 w-full h-full rounded-xl grid p-5 space-y-4 overflow-y-scroll">
							{(data.tasks.length === 0) && (
								<p class="place-self-center text-gray-500 text-lg select-none">
									Tidak ada tugas.
								</p>
							)}
							{data.tasks.map((task) => (
								<Task task={task}></Task>
							))}
						</div>
					</div>
				)
				: <p>Selamat Datang!!</p>}
		</div>
	);
});
