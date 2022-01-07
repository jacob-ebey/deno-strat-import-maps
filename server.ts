import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import { createRequestHandlerWithStaticFiles } from "@remix-run/deno";

// @ts-ignore
import * as build from "./build/index.js";

const remixHandler = createRequestHandlerWithStaticFiles({
  build: build as any,
  mode: "production",
});

console.log("Started on http://localhost:8000");
serve(remixHandler);
