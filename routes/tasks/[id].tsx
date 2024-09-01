import { getCookies, STATUS_CODE } from "@std/http";
import { HttpError, page } from "@fresh/core";

import tasks from "../../tasks.ts";
import Task from "../../islands/task.tsx";
import { define } from "../../utils/fresh.ts";

export const handler = define.handlers({
	GET({ params, req }) {
		const task = tasks.find((task) => task.id === params.id)!;

		if (!task) {
			throw new HttpError(
				STATUS_CODE.NotFound,
				"This task is not available.",
			);
		} else {
			return page({ task, token: getCookies(req.headers)["token"] });
		}
	},
});

export default define.page<typeof handler>(({ data: { task, token } }) => {
	return (
		<div class="flex bg-white w-dvw h-dvh p-10 grid overflow-y-auto">
			<div class="grow place-self-center w-full max-w-[500px] h-full max-h-96">
				<Task task={task} token={token} />
			</div>
		</div>
	);
});
