import { getCookies, STATUS_CODE } from "@std/http";

import { HttpError, page } from "@fresh/core";
import { define, isAdminUser, resolveUser } from "../../utils/mod.ts";

import CreateUser from "../../islands/create_user.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		const token = getCookies(ctx.req.headers)["token"];

		if (!token) {
			throw new HttpError(STATUS_CODE.Unauthorized);
		} else {
			const user = await resolveUser(token);

			if (!isAdminUser(user)) {
				throw new HttpError(
					STATUS_CODE.Forbidden,
					"This endpoint is limited to admins",
				);
			} else {
				return page({ token });
			}
		}
	},
});

export default define.page<typeof handler>(({ data: { token } }) => {
	return (
		<div class="grid place-items-center w-dvw h-dvh bg-white p-10 select-none">
			<div class="grid w-full md:max-w-[580px] h-full md:max-h-[400px] relative">
				<a
					class="absolute bg-gray-100 px-3 py-1 rounded-full"
					href="/?tab=users"
				>
					{"<  "}Back
				</a>
				<div class="place-self-center">
					<CreateUser token={token} />
				</div>
			</div>
		</div>
	);
});
