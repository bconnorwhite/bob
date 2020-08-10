import dotenv from "dotenv";

export const defaultDockerDir = "docker";

export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    ...dotenv.config().parsed
  }
}
