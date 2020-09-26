import { createCommand } from "commander-version";
import lintSourceCommand, { lintSource, lintSourceAction } from "./source";
import lintPackageCommand, { lintPackage, lintPackageAction } from "./package";
import lintCommitCommand, { lintCommit, lintCommitAction, LintCommitArgs } from "./commit";

export async function lint() {
  return lintPackage().then(() => {
    return lintSource();
  })
}

export async function lintAction() {
  lint();
}

export default createCommand("lint")
  .description("lint package.json and source files")
  .addCommand(lintPackageCommand)
  .addCommand(lintSourceCommand)
  .addCommand(lintCommitCommand)
  .action(lintAction);

export {
  lintSourceCommand,
  lintSource,
  lintSourceAction,
  lintPackageCommand,
  lintPackage,
  lintPackageAction,
  lintCommitCommand,
  lintCommit,
  lintCommitAction,
  LintCommitArgs
}
