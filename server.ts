import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createRequestHandler } from "@remix-run/server-runtime";
import mime from "mime";

// @ts-ignore
import * as build from "./build/index.js";

const remixHandler = createRequestHandler(build as any, {}, "production");

console.log("Started on http://localhost:8000");
serve(async (_req) => {
  try {
    const url = new URL(_req.url);

    const headers = new Headers();
    const contentType = mime.getType(url.pathname);
    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    if (url.pathname.startsWith("/build/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      headers.set("Cache-Control", "public, max-age=600");
    }

    const file = await Deno.readFile(`./public${url.pathname}`);

    return new Response(file, { headers });
  } catch (e: any) {
    if (e.code !== "EISDIR" && e.code !== "ENOENT") {
      throw e;
    }
  }

  try {
    return await remixHandler(_req);
  } catch (e: any) {
    console.error(e);

    return new Response("Internal Error", { status: 500 });
  }
});
