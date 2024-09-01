import { getCookies, STATUS_CODE } from "@std/http";
import {
	type AdminUser,
	BaseUser,
	define,
	generateToken,
	isAdminUser,
	kv,
	resolveUser,
	snowflake,
	type User,
	UserType,
} from "../../../utils/mod.ts";

export const handler = define.handlers({
	async POST(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (!token) {
			return new Response("Unauthorized", {
				status: STATUS_CODE.Unauthorized,
			});
		} else {
			const user = await resolveUser(token);

			if (!isAdminUser(user)) {
				return Response.json({
					message: "This endpoint only available to admins",
				}, { status: STATUS_CODE.Forbidden });
			} else {
				const data = await ctx.req.formData();

				const username = data.get("username") as string;
				const avatarUrl = data.get("avatarUrl") as string;
				const type = Number(data.get("type") as string);
				const id = snowflake();

				const newToken = generateToken();

				const baseUser: BaseUser<Exclude<UserType, UserType.Admin>> = {
					username,
					avatar_url: avatarUrl ?? undefined,
					type,
					id,
					token: newToken,
				};

				let user: Exclude<User, AdminUser>;

				switch (type) {
					case UserType.Student: {
						user = { ...baseUser, type, completedTasks: [] };
						break;
					}
					case UserType.Teacher: {
						user = { ...baseUser, type, tasks: [] };
						break;
					}
					default: {
						return Response.json(
							{ message: "Invalid user type." },
							{ status: STATUS_CODE.Forbidden },
						);
					}
				}

				const kvKey = ["users", id];
				await kv.atomic().check({ key: kvKey, versionstamp: null }).set(
					kvKey,
					user,
				).set(["sessions", newToken], id).commit();

				return new Response(null, { status: STATUS_CODE.NoContent });
			}
		}
	},
});
