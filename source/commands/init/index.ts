import { createCommand } from "commander";
import initSourceCommand, { initSource, initSourceAction, InitSourceArgs } from "./source";
import initPackageJSONCommand, { initPackageJSONAction } from "./package-json";
import initGitignoreCommand, { initGitignore, initGitignoreAction } from "./gitignore";

export type InitArgs =
  & InitSourceArgs;

export async function init({ index }: InitArgs = {}) {
  return Promise.all([
    initSourceAction({ index }),
    initPackageJSONAction(),
    initGitignoreAction()
  ]);
}

export function initAction() {
  init();
}

export default createCommand("init")
  .description("initialize source directory and package.json")
  .addCommand(initSourceCommand)
  .addCommand(initPackageJSONCommand)
  .addCommand(initGitignoreCommand)
  .action(initAction);

export {
  initSourceCommand,
  initSource,
  initSourceAction,
  InitSourceArgs,
  initPackageJSONCommand,
  initPackageJSONAction
}
