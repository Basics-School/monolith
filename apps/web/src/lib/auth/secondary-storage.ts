import { redis } from "./redis";

export const secondaryStorage = {
    get: async (key: string) => {
        const data = await redis.get(key);
        return data ? String(data) : null;
    },

    set: async (key: string, value: any, ttl?: number) => {
        const serialized = JSON.stringify(value);
        if (ttl) {
            await redis.setex(key, ttl, serialized);
        } else {
            await redis.set(key, serialized);
        }
    },

    delete: async (key: string) => {
        await redis.del(key);
    },
};
