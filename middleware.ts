import { ipAddress, next } from "@vercel/edge";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 2 requests from the same IP in 100 seconds
  limiter: Ratelimit.slidingWindow(2, "100 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/gemini",
};

export default async function middleware(request: Request) {
  // You could alternatively limit based on user ID or similar
  const ip = ipAddress(request) || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? next()
    : Response.redirect(new URL("/blocked.html", request.url));
}
