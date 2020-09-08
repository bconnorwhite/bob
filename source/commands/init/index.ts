import { createCommand } from "commander";
import initSourceCommand, { initSource, initSourceAction, InitSourceArgs } from "./source";
import initPackageJSONCommand, { initPackageJSONAction, initPackageJSON } from "./package-json";
import initGitCommand, { initGitAction, initGit, initGitignoreCommand, initGitignore, initGitignoreAction } from "./git";
import initTSConfigCommand, { initTSConfigAction, initTSConfig, InitTSConfigArgs } from "./tsconfig";
import initReadmeCommand, { initReadmeAction } from "./readme";

export type InitArgs =
  & InitSourceArgs;

export async function init({ index }: InitArgs = {}) {
  return initSource({ index }).then(async () => {
    return initPackageJSON().then(async () => {
      return initGit().then(async () => {
        return initTSConfig().then(() => {
          return initReadmeAction();
        });
      });
    });
  });
}

export function initAction() {
  init();
}

export default createCommand("init")
  .description("initialize source, package.json, .gitignore, and tsconfig.json")
  .addCommand(initSourceCommand)
  .addCommand(initPackageJSONCommand)
  .addCommand(initGitCommand)
  .addCommand(initTSConfigCommand)
  .addCommand(initReadmeCommand)
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
  initTSConfigCommand,
  initTSConfigAction,
  initTSConfig,
  InitTSConfigArgs,
  initReadmeCommand,
  initReadmeAction
}
