import tasks from "../../tasks.ts";
import { define } from "../../utils/fresh.ts";
import { page } from "@fresh/core";
import Task from "../../islands/task.tsx";

export const handler = define.handlers({
	GET({ params }) {
		const task = tasks.find((task) => task.id === params.id)!;
		return page(task);
	},
});

export default define.page<typeof handler>(({ data }) => {
	return (
		<div class="bg-white w-dvw h-dvh p-10 grid">
			<div class="place-self-center w-full max-w-96">
				<Task task={data}></Task>
			</div>
		</div>
	);
});
