import { ipAddress, next } from "@vercel/edge";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "3600 s"),
});

export const config = {
  matcher: "/api/gemini",
};

export default async function middleware(request: Request) {
  const ip = ipAddress(request) || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? next()
    : Response.redirect(new URL("/api/blocked", request.url));
}
