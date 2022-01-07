import { createRequestHandlerWithStaticFiles } from "@remix-run/deno";

// @ts-ignore
import * as build from "./build/index.js";

const remixHandler = createRequestHandlerWithStaticFiles({
  build: build as any,
  mode: "production",
});

const listener = Deno.listen({ port: 8000 });

console.log("Server starting on http://localhost:8000");

for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);

    for await (const request of requests) {
      try {
        await request.respondWith(await remixHandler(request.request));
      } catch (error) {
        console.error(error);
        await request.respondWith(
          new Response("Internal Server Error", { status: 500 })
        );
      }
    }
  })();
}
