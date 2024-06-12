import { DiscordSnowflake as snowflake } from "@sapphire/snowflake";
import { type Task } from "./utils/task.ts";

export default [
	{
		name: "tugas ulangan",
		author: {
			username: "heyk1n",
		},
		id: String(snowflake.generate()),
		endDate: Date.now() + (60 * 60 * 1000),
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
