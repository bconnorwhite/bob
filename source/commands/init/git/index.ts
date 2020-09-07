import { createCommand } from "commander";
import { exec } from "@bconnorwhite/exec";
import initGitignoreCommand, { initGitignoreAction, initGitignore } from "./gitignore";

export async function initGit() {
  return initGitignore().then(() => {
    return exec({
      command: "git",
      args: "init"
    });
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
