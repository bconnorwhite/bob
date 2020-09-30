import { createCommand } from "commander-version";
import lintSourceCommand, { lintSource, lintSourceAction } from "./source";
import lintTestCommand, { lintTestAction } from "./test";
import lintPackageCommand, { lintPackage, lintPackageAction } from "./package";
import lintCommitCommand, { lintCommit, lintCommitAction, LintCommitArgs } from "./commit";

export async function lint() {
  await lintPackageAction();
  await lintSourceAction();
  await lintTestAction();
}

export async function lintAction() {
  lint();
}

export default createCommand("lint")
  .description("lint package.json, source, and test files")
  .addCommand(lintPackageCommand)
  .addCommand(lintSourceCommand)
  .addCommand(lintTestCommand)
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
