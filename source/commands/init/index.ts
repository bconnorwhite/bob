import { createCommand } from "commander";
import initSourceCommand, { initSource, initSourceAction, InitSourceArgs } from "./source";
import initPackageJSONCommand, { initPackageJSONAction } from "./package-json";
import initGitCommand, { initGitAction, initGit, initGitignoreCommand, initGitignore, initGitignoreAction } from "./git";

export type InitArgs =
  & InitSourceArgs;

export async function init({ index }: InitArgs = {}) {
  return Promise.all([
    initSourceAction({ index }),
    initPackageJSONAction(),
    initGitAction(),
  ]);
}

export function initAction() {
  init();
}

export default createCommand("init")
  .description("initialize source directory and package.json")
  .addCommand(initSourceCommand)
  .addCommand(initPackageJSONCommand)
  .addCommand(initGitCommand)
  .action(initAction);

export {
  initSourceCommand,
  initSource,
  initSourceAction,
  InitSourceArgs,
  initPackageJSONCommand,
  initPackageJSONAction,
  initGitCommand,
  initGitAction,
  initGit,
  initGitignore,
  initGitignoreCommand,
  initGitignoreAction,
}
