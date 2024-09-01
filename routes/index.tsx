import tasksJson from "../tasks.ts";
import {
	define,
	generateAuthorizationUrl,
	isAdminUser,
	resolveUser,
	TabsType,
} from "../utils/mod.ts";
import { HttpError, page } from "@fresh/core";
import { getCookies, STATUS_CODE } from "@std/http";
import Task from "../components/task.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (token) {
			const user = await resolveUser(token);
			if (isAdminUser(user)) {
				const tab = ctx.url.searchParams.get("tab");
				if (!tab) {
					return ctx.redirect("/?tab=tasks");
				} else {
					switch (tab) {
						case TabsType.Tasks: {
							return page({
								user,
								tab,
								tasks: tasksJson,
								users: null,
							});
						}
						case TabsType.Users: {
							return page({
								user,
								tab,
								tasks: null,
								users: [],
							});
						}
						default: {
							throw new HttpError(STATUS_CODE.NotFound);
						}
					}
				}
			} else {
				return page({ user, tab: null, tasks: tasksJson, users: null });
			}
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
					<div class="flex flex-col w-full max-w-[600px] h-full md:max-h-[500px] space-y-4 select-none overflow-y-auto">
						<div class="flex w-full justify-between">
							<p class="font-bold text-3xl place-self-center">
								Hello {data.user.username}!
							</p>
							<img
								src={data.user.avatar_url}
								class="bg-black w-12 h-12 rounded-full place-self-center pointer-events-none"
							/>
						</div>
						<div>
							{(isAdminUser(data.user)) &&
								(
									<aside class="space-x-3">
										<a href="/?tab=tasks">Tasks</a>
										<a href="/?tab=users">Users</a>
									</aside>
								)}
						</div>
						{isAdminUser(data.user)
							? (
								<div class="flex justify-between">
									<div class="h-full grid place-items-center">
										{data.tab === TabsType.Tasks
											? <p>{data.tasks.length} tasks</p>
											: <p>{data.users!.length} users</p>}
									</div>
									<a href={`/${data.tab}/new`}>
										<div class="bg-black rounded-full px-4 py-1 text-white select-none">
											Create
										</div>
									</a>
								</div>
							)
							: null}
						<div class="bg-gray-200 grow rounded-xl grid p-5 space-y-4 overflow-y-scroll">
							{data.tasks
								? (
									data.tasks.length > 0
										? data.tasks.map((task) => (
											<Task task={task} />
										))
										: (
											<p class="place-self-center text-gray-500 text-lg">
												Tidak ada tugas.
											</p>
										)
								)
								: data.users.length === 0
								? (
									<p class="place-self-center text-gray-500 text-lg">
										Tidak ada akun.
									</p>
								)
								: null}
						</div>
					</div>
				)
				: (
					<div class="space-y-6 grid place-items-center w-full max-w-72 select-none">
						<p class="font-bold text-lg md:text-xl place-self-center">
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
