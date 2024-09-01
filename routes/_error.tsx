import { type HttpError, type PageProps } from "@fresh/core";

export default function (
	{ error }: Omit<PageProps, "error"> & { error: HttpError },
) {
	return (
		<div class="bg-white w-dvw h-dvh p-8 grid place-items-center">
			<div class="select-none text-center">
				<p>{error.status}</p>
				<p>{error.message}</p>
			</div>
		</div>
	);
}
