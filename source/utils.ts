import dotenv from "dotenv";

export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    ...dotenv.config().parsed
  }
}
