import { kv } from "./mod.ts";
import { STATUS_CODE } from "@std/http/status";
import { HttpError } from "@fresh/core";

export enum UserType {
	Admin,
	Teacher,
	Student,
}

export interface User {
	avatar_url?: string;
	username: string;
	type: UserType;
}

export async function resolveUser(token: string): Promise<User> {
	const { value: userId } = await kv.get<number | bigint>([
		"sessions",
		token,
	]);
	const { value: user } = await kv.get<User>(["users", userId!]);

	/*
	if (!user) throw new HttpError(STATUS_CODE.Unauthorized)}
    else return user;
	*/
	return !user
		? (() => {
			throw new HttpError(STATUS_CODE.Unauthorized);
		})()
		: user;
}
