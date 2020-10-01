import { createCommand } from "commander-version";
import ora from "ora";
import run from "package-run";
import { getSourceDir } from "../../structure";

const warning = 'Warning: React version was set to "detect" in eslint-plugin-react settings, but the "react" package is not installed. Assuming latest React version for linting.';

export async function lintSource() {
  return run({
    command: "eslint",
    args: [
      getSourceDir().relative, {
        "ext": ".ts,tsx",
        "no-error-on-unmatched-pattern": true
      }
    ],
    silent: true
  }, {
    silent: true
  });
}

export async function lintSourceAction() {
  const source = getSourceDir().relative;
  const spinner = ora(`Linting '${source}'`).start();
  return lintSource().then(({ output, error }) => {
    const cleanError = error.replace(warning, "");
    const message = `Linted '${source}'`;
    if(output || cleanError) {
      if(cleanError) {
        spinner.fail(message);
      } else {
        spinner.warn(message);
      }
      if(output) {
        console.info(output);
      }
      if(cleanError) {
        console.error(cleanError);
      }
    } else {
      spinner.succeed(message);
    }
  });
}

export default createCommand("source")
  .description("lint source files with ESLint")
  .action(lintSourceAction);
