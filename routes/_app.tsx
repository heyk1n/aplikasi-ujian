import { type PageProps } from "@fresh/core";
import { Partial } from "@fresh/core/runtime";

export default function App({ Component }: PageProps) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<title>src</title>
				<link rel="stylesheet" href="/styles.css" />
			</head>
			<body f-client-nav>
				<Partial name="body">
					<Component />
				</Partial>
			</body>
		</html>
	);
}
