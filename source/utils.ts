import dotenv from "dotenv";
import { getPackageJSON } from "@bconnorwhite/module";

export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    ...dotenv.config().parsed
  }
}

export async function getModuleName(defaultName?: string): Promise<string | undefined> {
  if(defaultName) {
    return Promise.resolve(defaultName);
  } else {
    return getPackageJSON(__dirname).then((modulePkgJSON) => {
      return modulePkgJSON?.name;
    });
  }
}
