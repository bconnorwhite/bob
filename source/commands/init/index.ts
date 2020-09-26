import { createCommand } from "commander-version";
import initSourceCommand, { initSource, initSourceAction, InitSourceArgs } from "./source";
import initPackageJSONCommand, { initPackageJSONAction, initPackageJSON } from "./package-json";
import initGitCommand, { initGitAction, initGit, initGitignoreCommand, initGitignore, initGitignoreAction } from "./git";
import initTSConfigCommand, { initTSConfigAction, initTSConfig, InitTSConfigArgs } from "./tsconfig";
import initReadmeCommand, { initReadmeAction, initReadme } from "./readme";
import initCommitizenCommand, { initCommitizenAction, initCommitizen, InitCommitizenArgs } from "./commitizen";

export type InitArgs =
  & InitSourceArgs;

export async function init({ index }: InitArgs = {}) {
  return Promise.all([
    initSource({ index }),
    initTSConfig(),
    initPackageJSON().then(async () => {
      return initGit().then(() => {
        return initReadme();
      })
    })
  ]);
}

export function initAction() {
  init();
}

export default createCommand("init")
  .description("initialize source, package.json, .gitignore, tsconfig.json, README.md, .cz.json")
  .addCommand(initSourceCommand)
  .addCommand(initPackageJSONCommand)
  .addCommand(initGitCommand)
  .addCommand(initTSConfigCommand)
  .addCommand(initReadmeCommand)
  .addCommand(initCommitizenCommand)
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
  initReadmeAction,
  initCommitizenCommand,
  initCommitizenAction,
  initCommitizen,
  InitCommitizenArgs
}
