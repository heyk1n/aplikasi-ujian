import { DiscordSnowflake as snowflake } from "@sapphire/snowflake";
import { type Task } from "./components/task.tsx";

export default [
	{
		title: "tugas ulangan",
		authorName: "heyk1n",
		id: String(snowflake.generate()),
		questions: [
			{
				text: "pertanyaan akan terlihat disini",
				choices: [
					"oke",
					"sip",
					"ini jawaban ketiga",
					"jawaban keempat",
					"jawaban kelima, tes aja",
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
			{
				text: "soal ketiga nih",
				choices: [
					"y",
					"ywdh sih",
					"peduli ap gue",
				],
			},
			{
				text: "soal keempat nih",
				choices: [
					"y",
					"ywdh sih",
					"peduli ap gue",
				],
			},
		],
	},
] satisfies Task[];
