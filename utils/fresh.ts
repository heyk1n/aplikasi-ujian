import { createDefine } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();

export enum TabsType {
	Tasks = "tasks",
	Users = "users",
}
