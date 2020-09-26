import { createCommand } from "commander-version";
import run from "package-run";

const warning = 'Warning: React version was set to "detect" in eslint-plugin-react settings, but the "react" package is not installed. Assuming latest React version for linting.';

export async function lintSource() {
  return run({
    command: "eslint",
    args: [
      "source", {
        ext: ".ts,tsx"
      }
    ],
    silent: true
  }, {
    silent: true
  }).then(({ output, error }) => {
    console.info(output);
    if(error) {
      const cleanError = error.replace(warning, "");
      if(cleanError) {
        console.error(cleanError);
      }
    }
  });
}

export async function lintSourceAction() {
  lintSource();
}

export default createCommand("source")
  .description("lint source files with ESLint")
  .action(lintSourceAction);
