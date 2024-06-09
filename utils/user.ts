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
