import { type Task } from "../utils/task.ts";

export default function ({ task }: { task: Task }) {
	return (
		<a href={`/tasks/${task.id}`}>
			<div class="bg-white rounded-lg p-4 h-20 select-none truncate">
				<p class="font-semibold">{task.name}</p>
				<p class="text-slate-500 text-sm">by {task.author.username}</p>
			</div>
		</a>
	);
}
