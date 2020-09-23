import { promises } from "fs";
import { createCommand } from "commander-version";
import run from "package-run";
import { InitCommitizenArgs, initCommitizen } from "./init";
import { getCommitizenConfig } from "../structure";

export async function commit(args: InitCommitizenArgs = {}) {
  const commitizenConfig = getCommitizenConfig();
  return commitizenConfig.exists().then(async (existed) => {
    return initCommitizen(args).then(async () => {
      return run({ command: "cz" }, { silent: true }).then(() => {
        if(existed) {
          return undefined;
        } else {
          return promises.unlink(commitizenConfig.path);
        }
      });
    });
  });
}

export async function commitAction() {
  commit();
}

export default createCommand("commit")
  .description("create a conventional commit")
  .action(commitAction);
