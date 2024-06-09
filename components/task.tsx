export interface Task {
	title: string;
	authorName: string;
	id: string;
	questions: Question[];
}

interface Question {
	text: string;
	choices: string[];
}

export default function ({ task }: { task: Task }) {
	return (
		<a href={`/tasks/${task.id}`}>
			<div class="bg-white rounded-lg p-4 h-20 select-none truncate">
				<p class="font-semibold">{task.title}</p>
				<p class="text-slate-500 text-sm">Oleh {task.authorName}</p>
			</div>
		</a>
	);
}
