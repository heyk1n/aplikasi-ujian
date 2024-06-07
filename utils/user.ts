import { kv } from "./mod.ts";
import { STATUS_CODE } from "@std/http/status";
import { HttpError } from "@fresh/core";

export enum UserType {
	Admin,
	Teacher,
	Student,
}
// https://fuzzy-rotary-phone-56xr4jv9q953vrpj-8000.app.github.dev/auth/github
// dimana tempat url nya?
// kin, sekalian tampilin web nya coy, kita coba coba awokkowakowa
// di gw port 8000nya ga keliatan, disitu ada urlnya, bisa di copy, atau ga nanti gue bikin port baru
// eh bentar... gw liat ada port 8000 deh

// tapi ngelag banget jir
// nah oke bisa
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
