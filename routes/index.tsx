import tasksJson from "../tasks.ts";
import {
	define,
	generateAuthorizationUrl,
	resolveUser,
	UserType,
} from "../utils/mod.ts";
import { page } from "@fresh/core";
import { getCookies } from "@std/http/cookie";
import Task from "../components/task.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		const tab = ctx.url.searchParams.get("tab");
		if (!tab) ctx.url.searchParams.set("tab", "tasks");

		const token = getCookies(ctx.req.headers)["token"];

		if (token) {
			const user = await resolveUser(token);
			return page({ user, tasks: tasksJson });
		} else {
			return page({
				user: null,
				authorizeUrl: generateAuthorizationUrl(),
			});
		}
	},
});

export default define.page<typeof handler>(({ data }) => {
	return (
		<div class="grid place-items-center w-dvw h-dvh bg-white p-10">
			{data.user
				? (
					<div class="flex flex-col w-full max-w-[600px] h-full max-h-96 space-y-4">
						<div class="flex w-full justify-between">
							<p class="font-bold text-3xl place-self-center select-none">
								Hello {data.user.username}!
							</p>
							<img
								src={data.user.avatar_url}
								class="bg-black w-12 h-12 rounded-full place-self-center pointer-events-none"
							/>
						</div>
						<div>
							{(data.user.type === UserType.Admin)
								? (
									<aside class="space-x-3">
										<a href="/?tab=tasks">Tasks</a>
										<a href="/?tab=accounts">Accounts</a>
									</aside>
								)
								: null}
						</div>
						<div class="bg-gray-200 grow rounded-xl grid p-5 space-y-4 overflow-y-scroll">
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
				: (
					<div class="space-y-6 grid place-items-center w-full max-w-72 select-none">
						<p class="font-bold text-lg place-self-center">
							Welcome to exam app!!
						</p>
						<div class="space-y-1 w-full grid place-items-center">
							<a
								class="bg-black text-white py-2 grid place-items-center rounded-full w-full"
								href="/login"
							>
								Login with token
							</a>
							<p class="text-sm text-slate-500">or</p>
							<a
								class="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-2 grid place-items-center rounded-full w-full"
								href={data.authorizeUrl.url}
							>
								Login as admin
							</a>
						</div>
					</div>
				)}
		</div>
	);
});
