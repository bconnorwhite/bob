import { createCommand } from "commander-version";
import ora from "ora";
import run from "package-run";
import { getTestDir } from "../../structure";

const warning = 'Warning: React version was set to "detect" in eslint-plugin-react settings, but the "react" package is not installed. Assuming latest React version for linting.';

export async function lintTest() {
  return run({
    command: "eslint",
    args: [
      getTestDir().relative, {
        "ext": ".ts,tsx",
        "no-error-on-unmatched-pattern": true
      }
    ],
    silent: true
  }, {
    silent: true
  });
}

export async function lintTestAction() {
  const test = getTestDir().relative;
  const spinner = ora(`Linting '${test}'`).start();
  return lintTest().then(({ output, error }) => {
    const cleanError = error.replace(warning, "");
    const message = `Linted '${test}'`;
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

export default createCommand("test")
  .description("lint test files with ESLint")
  .action(lintTestAction);
