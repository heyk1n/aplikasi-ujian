import { useState } from "preact/hooks";
import Choice from "../components/choice.tsx";
import { type Task } from "../components/task.tsx";

export default function ({ task }: { task: Task }) {
	const [questionId, setQuestionId] = useState(0);
	const { text, choices } = task.questions[questionId];

	return (
		<div>
			<div class="bg-white w-full rounded-xl p-3 shadow-xl grid text-center space-y-5">
				<p class="place-self-center">{text}</p>
				<div class="space-y-2">
					{choices.map((choice, id) => (
						<Choice
							id={id}
							label={choice}
							onClick={() => {
								return;
							}}
						>
						</Choice>
					))}
					<div class="grid place-items-center">
						<div class="flex space-x-5">
							<button
								disabled={questionId === 0}
								class="disabled:opacity-50"
								onClick={() => setQuestionId(questionId - 1)}
							>
								previous
							</button>
							<button
								disabled={questionId ===
									(task.questions.length - 1)}
								class="disabled:opacity-50"
								onClick={() => setQuestionId(questionId + 1)}
							>
								next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
