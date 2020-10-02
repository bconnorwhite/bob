import { createCommand } from "commander-version";
import ora from "ora";
import run from "package-run";
import { getPackageJSON } from "../../structure";

export async function lintPackage() {
  return run({
    command: "npmPkgJsonLint",
    args: ".",
    silent: true
  }, {
    silent: true
  });
}

export async function lintPackageAction() {
  const pkgJSON = getPackageJSON().relative;
  const spinner = ora(`Linting '${pkgJSON}'...`).start();
  return lintPackage().then(({ error, output }) => {
    const message = `Linted '${pkgJSON}'`;
    if(output || error) {
      if(error) {
        spinner.fail(message);
      } else {
        spinner.warn(message);
      }
      if(output) {
        console.info(output);
      }
      if(error) {
        console.error(error);
      }
    } else {
      spinner.succeed(message);
    }
  });
}

export default createCommand("package")
  .description("lint package.json")
  .action(lintPackageAction);
