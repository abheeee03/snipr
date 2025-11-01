import {Redis} from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

const redis = Redis.fromEnv()
export const rateLimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "5 s"),
    analytics: true,
    timeout: 10000
})