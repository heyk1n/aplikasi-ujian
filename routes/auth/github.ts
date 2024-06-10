import {
	define,
	generateToken,
	kv,
	type User,
	UserType,
} from "../../utils/mod.ts";
import { OAuthApp } from "@octokit/oauth-app";
import { setCookie, STATUS_CODE } from "@std/http";

import config from "../../config.json" with { type: "json" };

export const handler = define.handlers({
	async GET(ctx) {
		const app = new OAuthApp({
			clientId: Deno.env.get("GITHUB_CLIENT_ID")!,
			clientSecret: Deno.env.get("GITHUB_CLIENT_SECRET")!,
			clientType: "github-app",
		});

		const userOctokit = await app.getUserOctokit({
			code: ctx.url.searchParams.get("code")!,
			state: ctx.url.searchParams.get("state")!,
		});

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
