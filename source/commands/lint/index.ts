import { createCommand } from "commander-version";
import lintSourceCommand, { lintSource, lintSourceAction } from "./source";
import lintPackageCommand, { lintPackage, lintPackageAction } from "./package";

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
  .action(lintAction);

export {
  lintSourceCommand,
  lintSource,
  lintSourceAction,
  lintPackageCommand,
  lintPackage,
  lintPackageAction
}
