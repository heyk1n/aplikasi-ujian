import { kv, snowflake } from "./mod.ts";
import { isTeacherUser, type TeacherUser } from "./user.ts";

export async function createTask(
	options: CreateTaskOptions,
	user: TeacherUser,
) {
	if (!isTeacherUser(user)) {
		throw new Error("You're not a teacher");
	} else {
		const id = snowflake();
		const newTask: Task = {
			...options,
			id,
			author: { username: user.username, avatar_url: user.avatar_url },
		};

		const result = await kv.atomic().set(["tasks", id], newTask).set([
			"users",
			user.id,
		], { ...user, tasks: [...user.tasks, id] })
			.commit();
		if (result.ok) {
			return newTask;
		} else {
			throw new Error("Task creation failed.");
		}
	}
}

export async function submitAnswer(
	token: string,
	taskId: string,
	data: AnswerSubmission,
) {
	return await fetch(`/api/tasks/${taskId}/answers`, {
		method: "POST",
		headers: {
			authorization: token,
		},
		body: JSON.stringify(data),
	});
}

export function isCompleted(choices: Choice[]): choices is number[] {
	return !choices.includes(null);
}

export type Choice = number | null;

export interface AnswerSubmission {
	choices: Choice[];
}

export type CreateTaskOptions = Omit<Task, "id" | "author">;

export interface Task {
	name: string;
	author: Pick<TeacherUser, "avatar_url" | "username">;
	id: string;
	endDate: number;
	questions: TaskQuestion[];
}

export interface TaskQuestion {
	text: string;
	choices: string[];
}
