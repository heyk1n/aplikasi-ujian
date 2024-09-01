import {
	type AnswerSubmission,
	define,
	isCompleted,
	isStudentUser,
	kv,
	resolveUser,
	type StudentUser,
} from "../../../../utils/mod.ts";
import { HttpError } from "@fresh/core";
import { STATUS_CODE } from "@std/http/status";

export const handler = define.handlers({
	async POST(ctx) {
		const token = ctx.req.headers.get("authorization");

		if (!token) {
			throw new HttpError(STATUS_CODE.Unauthorized);
		} else {
			const user = await resolveUser(token);

			if (!isStudentUser(user)) {
				return Response.json({
					message: "This endpoint only available to students",
				}, { status: STATUS_CODE.Forbidden });
			} else {
				const { choices }: AnswerSubmission = await ctx.req.json();

				if (!isCompleted(choices)) {
					return new Response(
						"You didn't answer all the questions yet.",
						{
							status: STATUS_CODE.BadRequest,
						},
					);
				} else {
					const kvKey = ["tasks", ctx.params.id, "answers", user.id];
					const commit = await kv.atomic().check({
						key: kvKey,
						versionstamp: null,
					}).set(kvKey, choices).set(
						["users", user.id],
						{
							...user,
							completedTasks: [
								...user.completedTasks,
								ctx.params.id,
							],
						} satisfies StudentUser,
					).commit();

					if (commit.ok) {
						return new Response(null, {
							status: STATUS_CODE.NoContent,
						});
					} else {
						return Response.json({
							message: "You've already submit your answers",
						}, { status: STATUS_CODE.Forbidden });
					}
				}
			}
		}
	},
});
