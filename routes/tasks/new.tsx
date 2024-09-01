import { STATUS_CODE } from "@std/http/status";
import { define } from "../../utils/fresh.ts";
import { HttpError } from "@fresh/core";

export const handler = define.handlers({
	GET(_) {
		throw new HttpError(STATUS_CODE.NotFound);
	},
});
