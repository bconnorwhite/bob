import { join } from "path";
import find from "find";
import { createCommand } from "commander-version";
import { getWorkspacePackages, exists } from "@bconnorwhite/package";
import { getSourceDir } from "../structure";

export async function list() {
  return getWorkspacePackages().then(async (packages) => {
    if(packages) {
      let promises: Promise<string[]>[] = [];
      Object.keys(packages).forEach((name) => {
        const promise = new Promise<string[]>((resolve) => {
          const packageRelative = join(packages[name].location, getSourceDir().relative);
          exists(packageRelative).then((result) => {
            if(result) {
              find.file(/\.tsx?$/, packageRelative, (files) => {
                resolve(files);
              });
            } else {
              resolve([]);
            }
          });
        });
        promises.push(promise);
      });
      return Promise.all(promises).then((results) => {
        return results.reduce((retval, files) => retval.concat(files), []);
      });
    } else {
      return new Promise<string[]>((resolve) => {
        find.file(/\.tsx?$/, getSourceDir().relative, (files) => {
          resolve(files);
        });
      });
    }
  });
}

export function listAction() {
  list().then((files) => {
    console.log(files);
  });
}

export default createCommand("list")
  .description("list files included in build")
  .action(listAction);
