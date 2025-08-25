import Redis from "ioredis"
import env from "dotenv";
env.config();
export const redis = new Redis(process.env.REDIUS_KEY);
// await redis.set('foo', 'bar');