import Redis from 'ioredis'

// @ts-ignore
declare const global: NodeJS.Global & { redis?: Redis.Redis }

const redis = global.redis || new Redis(process.env.REDIS_URI)
if (process.env.NODE_ENV === 'development') global.redis = redis

export default redis
