import { page } from "@fresh/core";
import { getCookies, setCookie, STATUS_CODE } from "@std/http";
import { define, kv } from "../../../utils/mod.ts";

export const handler = define.handlers({
	GET(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (token && (await kv.get<bigint | number>(["sessions", token])).value) return ctx.redirect("/");
		return page();
	},
	async POST(ctx) {
		// TODO: validasi token
		const data = await ctx.req.formData();
		const token = data.get("token") as string;

		const user = await kv.get<bigint | number>(["sessions", token]);
		if (user.value) {
			const headers = new Headers();
			headers.set("location", "/");

			setCookie(headers, { name: "token", value: token, path: "/" });

			return new Response(null, {
				headers,
				status: STATUS_CODE.Found,
			});
		} else {
			return page({ token });
		}
	},
});

export default define.page<typeof handler>((_ctx) => {
	return (
		<div class="grid place-items-center w-dvw h-dvh bg-white p-10">
			<form class="bg-white rounded-2xl shadow-lg p-5 grid place-items-center w-full max-w-72 space-y-3">
				<p>Silahkan login!</p>
				<input
					type="password"
					placeholder="kin.*****"
					class="w-full rounded-full bg-slate-300 outline-none text-center p-2"
				>
				</input>
				<button
					class="bg-black text-white rounded-full px-6 py-1"
					type="submit"
				>
					Login
				</button>
			</form>
		</div>
	);
});
