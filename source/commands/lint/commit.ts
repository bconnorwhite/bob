import { createCommand } from "commander-version";
import run from "package-run";

export type LintCommitArgs = {
  env?: string;
}

export async function lintCommit(args: LintCommitArgs = {}) {
  const env = args.env ?? "";
  return run({
    command: "commitlint",
    args: {
      extends: "@commitlint/config-conventional",
      env
    }
  });
}

export async function lintCommitAction() {
  lintCommit({
    env: "HUSKY_GIT_PARAMS"
  });
}

export default createCommand("commit")
  .description("lint a commit message from husky")
  .action(lintCommitAction);
