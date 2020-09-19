import { createCommand } from "commander-version";
import run from "package-run";

export async function lintSource() {
  return run({
    command: "eslint",
    args: "source",
    flags: {
      ext: ".ts,tsx"
    }
  });
}

export async function lintSourceAction() {
  lintSource();
}

export default createCommand("source")
  .description("lint source files with ESLint")
  .action(lintSourceAction);
