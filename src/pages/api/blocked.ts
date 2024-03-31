import type { APIRoute } from "astro";

export const POST: APIRoute = async () => {
  return new Response("Wait and retry after an hour", { status: 429 });
};
