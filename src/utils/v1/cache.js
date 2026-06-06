// import { redisClient } from "../config/redis.js";

import { redisClient } from "../../config/redis.js";

export const getCache = async (key) => {
  const data = await redisClient.get(key);

  return data ? JSON.parse(data) : null;
};

export const setCache = async (key, value, ttl = 600) => {
  await redisClient.set(key, JSON.stringify(value), "EX", ttl);
};

export const deleteCache = async (key) => {
  await redisClient.del(key);
};

export const redisKeys = {
  organizations: () => "org:list",

  organizationById: (orgId) => `org:${orgId}`,
};
