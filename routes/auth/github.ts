import {
	define,
	generateToken,
	kv,
	resolveAuthUser,
	type User,
	UserType,
} from "../../utils/mod.ts";
import { setCookie, STATUS_CODE } from "@std/http";

import config from "../../config.json" with { type: "json" };

export const handler = define.handlers({
	async GET(ctx) {
		const userOctokit = await resolveAuthUser(
			ctx.url.searchParams.get("code")!,
			ctx.url.searchParams.get("state")!,
		);

		const { data: user } = await userOctokit.request("GET /user");

		if (!config.ops.includes(user.id)) {
			return new Response("Kamu bukan admin", {
				status: STATUS_CODE.Unauthorized,
			});
		} else {
			const userId = user.id;
			const token = generateToken();

			await kv.atomic().set(["sessions", token], userId).set(
				["users", userId],
				{
					avatar_url: user.avatar_url,
					username: user.login,
					id: String(user.id),
					type: UserType.Admin,
				} satisfies User,
			).commit();

			const headers = new Headers();

			headers.set("location", "/");
			setCookie(headers, {
				name: "token",
				value: token,
				path: "/",
				secure: true,
			});

			return new Response(null, {
				headers,
				status: STATUS_CODE.Found,
			});
		}
	},
});
