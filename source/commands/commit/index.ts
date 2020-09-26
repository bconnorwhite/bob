import { promises } from "fs";
import { createCommand } from "commander-version";
import run from "package-run";
import { InitCommitizenArgs, initCommitizen } from "../init";
import { getCommitizenConfig } from "../../structure";
import commitFeatCommand from "./feat";
import commitFixCommand from "./fix";
import commitRefactorCommand from "./refactor";
import commitDocsCommand from "./docs";
import commitStyleCommand from "./style";
import commitTestCommand from "./test";
import commitBuildCommand from "./build";
import commitCICommand from "./ci";
import commitPerfCommand from "./perf";
import commitChoreCommand from "./chore";
import commitRevertCommand from "./revert";

export type CommitArgs = {
  message: string;
  scope?: string;
}

export function getScope(scope?: string) {
  if(scope) {
    return `(${scope})`;
  } else {
    return "";
  }
}

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
  .addCommand(commitFeatCommand)
  .addCommand(commitFixCommand)
  .addCommand(commitRefactorCommand)
  .addCommand(commitDocsCommand)
  .addCommand(commitStyleCommand)
  .addCommand(commitTestCommand)
  .addCommand(commitBuildCommand)
  .addCommand(commitCICommand)
  .addCommand(commitPerfCommand)
  .addCommand(commitChoreCommand)
  .addCommand(commitRevertCommand)
  .action(commitAction);
