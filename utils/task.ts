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
			return id;
		} else {
			throw new Error("Task creation failed.");
		}
	}
}

export type CreateTaskOptions = Omit<Task, "id" | "author">;

export interface Task {
	name: string;
	author: Pick<TeacherUser, "avatar_url" | "username">;
	id: string;
	questions: TaskQuestion[];
}

export interface TaskQuestion {
	text: string;
	choices: string[];
}
