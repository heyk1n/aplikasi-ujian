import { type Task } from "./components/task.tsx";

export default [
	{
		title: "tugas pertama",
		authorName: "heyk1n",
		id: crypto.randomUUID(),
		questions: [
			{
				text: "Soal pertama",
				choices: [
					"oke",
					"sip",
				],
			},
			{
				text: "soal kedua nih",
				choices: [
					"y",
					"ywdh sih",
					"peduli ap gue",
				],
			},
		],
	},
] satisfies Task[];
