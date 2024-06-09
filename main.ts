import { App, fsRoutes, staticFiles, trailingSlashes } from "@fresh/core";
import { State } from "./utils/fresh.ts";

export const app = new App<State>();
app.use(staticFiles());
app.use(trailingSlashes("never"));

await fsRoutes(app, {
	dir: "./",
	loadIsland: (path) => import(`./islands/${path}`),
	loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
	await app.listen();
}
