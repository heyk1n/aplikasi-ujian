import { createDefine } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

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

export const define = createDefine<State>();
export const kv = await Deno.openKv();

export function generateToken() {
	return `kin.${crypto.randomUUID().replaceAll("-", "")}`;
}
