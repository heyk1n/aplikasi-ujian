import { useState } from "preact/hooks";
import Choice from "../components/choice.tsx";
import { type Task } from "../components/task.tsx";

export default function ({ task }: { task: Task }) {
	const [questionId, setQuestionId] = useState(0);
	const { text, choices } = task.questions[questionId];
	const [myChoices, setMyChoices] = useState<(number | null)[]>(
		choices.map(() => null),
	);

	return (
		<div class="space-y-2">
			<div class="flex space-x-3 bg-gray-100 rounded-xl p-3">
				{task.questions.map((_, questionIndex) => (
					<button
						class={`w-8 h-8 bg-${
							(questionId === questionIndex) ? "black" : "white"
						} rounded-full text-${
							(questionId === questionIndex) ? "white" : "black"
						}`}
						onClick={() => setQuestionId(questionIndex)}
					>
						{questionIndex + 1}
					</button>
				))}
			</div>

			<div class="bg-white w-full rounded-xl p-3 shadow-xl grid text-center space-y-5">
				<p class="place-self-center">{text}</p>
				<div class="space-y-2">
					{choices.map((choice, id) => (
						<Choice
							selected={myChoices[questionId] === id}
							id={id}
							label={choice}
							onClick={() =>
								setMyChoices(myChoices.with(questionId, id))}
						/>
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
