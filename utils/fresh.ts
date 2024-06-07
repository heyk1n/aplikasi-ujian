import { createDefine } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();

export function generateToken() {
	return `kin.${crypto.randomUUID().replaceAll("-", "")}`;
}
