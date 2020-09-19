import { createCommand } from "commander-version";
import isGitRepo from "is-git-repository";
import { exec } from "@bconnorwhite/exec";
import initGitignoreCommand, { initGitignoreAction, initGitignore } from "./gitignore";

export async function initGit() {
  return initGitignore().then(() => {
    if(!isGitRepo()) {
      return exec({
        command: "git",
        args: "init"
      });
    } else {
      return undefined;
    }
  });
}

export async function initGitAction() {
  initGit();
}

export default createCommand("gitignore")
  .description("initialize git repo")
  .addCommand(initGitignoreCommand)
  .action(initGitAction);

export {
  initGitignoreCommand,
  initGitignoreAction,
  initGitignore
}
