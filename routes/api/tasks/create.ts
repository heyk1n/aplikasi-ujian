import { getCookies, STATUS_CODE } from "@std/http";
import { HttpError } from "@fresh/core";
import {
	createTask,
	define,
	isTeacherUser,
	resolveUser,
} from "../../../utils/mod.ts";

const unauthorized = new HttpError(STATUS_CODE.Unauthorized);

export const handler = define.handlers({
	async POST(ctx) {
		const token = getCookies(ctx.req.headers)["token"];
		if (!token) {
			throw unauthorized;
		} else {
			const user = await resolveUser(token);

			if (!isTeacherUser(user)) {
				throw unauthorized;
			} else {
                const newTask = await ctx.req.json();
                return Response.json(await createTask(newTask, user));
			}
		}
	},
});
