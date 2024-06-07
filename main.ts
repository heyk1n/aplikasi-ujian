import { App, staticFiles, fsRoutes } from "@fresh/core";
import { State } from "./utils.ts";

export const app = new App<State>();
app.use(staticFiles());

app.get("/api/:joke", () => new Response("Hello World"));

await fsRoutes(app, {
  dir: "./",
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}

