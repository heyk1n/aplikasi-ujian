import { kv } from "./mod.ts";
import { STATUS_CODE } from "@std/http/status";
import { HttpError } from "@fresh/core";

export const SESSION_EXPIRE = 28_800;

export function generateToken() {
	return `kin.${crypto.randomUUID().replaceAll("-", "")}`;
}

export async function resolveUser(token: string): Promise<User> {
	const { value: userId } = await kv.get<number | bigint>([
		"sessions",
		token,
	]);

	if (!userId) {
		throw new HttpError(STATUS_CODE.Unauthorized);
	} else {
		const { value: user } = await kv.get<User>(["users", userId]);
		if (!user) {
			throw new HttpError(STATUS_CODE.NotFound);
		} else {
			return user;
		}
	}
}

export function isAdminUser(user: User): user is AdminUser {
	return user.type === UserType.Admin;
}

export function isStudentUser(user: User): user is StudentUser {
	return user.type === UserType.Student;
}

export function isTeacherUser(user: User): user is TeacherUser {
	return user.type === UserType.Teacher;
}

export enum UserType {
	Admin,
	Teacher,
	Student,
}

export interface BaseUser<T extends UserType> {
	avatar_url?: string;
	username: string;
	id: string;
	type: T;
	token: string;
}

export interface StudentUser extends BaseUser<UserType.Student> {
	completedTasks: string[];
}

export interface TeacherUser extends BaseUser<UserType.Teacher> {
	tasks: string[];
}

export type AdminUser = Omit<BaseUser<UserType.Admin>, "token">;

export type User = StudentUser | TeacherUser | AdminUser;
