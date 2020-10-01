import dotenv from "dotenv";
import ConfigStore from "configstore";
import { getPackageJSON } from "@bconnorwhite/module";
import { PackageJSON } from "@bconnorwhite/package";

export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    ...dotenv.config().parsed
  }
}

export function getRepoName(pkgJSON?: PackageJSON) {
  if(typeof pkgJSON?.repository === "object") {
    return pkgJSON?.repository.url.replace("git+https://github.com/", "").replace(".git", "");
  } else {
    return undefined;
  }
}

export async function getConfigStore() {
  return getModuleName().then(async (moduleName) => {
    return moduleName ? new ConfigStore(moduleName) : undefined;
  });
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
