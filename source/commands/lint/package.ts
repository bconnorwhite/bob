import { createCommand } from "commander-version";
import run from "package-run";

export async function lintPackage() {
  return run({
    command: "npmPkgJsonLint",
    args: "."
  }, {
    silent: true
  });
}

export async function lintPackageAction() {
  lintPackage();
}

export default createCommand("package")
  .description("lint package.json")
  .action(lintPackageAction);
