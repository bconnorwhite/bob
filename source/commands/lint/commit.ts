import { createCommand } from "commander-version";
import run from "package-run";

export type LintCommitArgs = {
  message?: string;
}

export async function lintCommit(args: LintCommitArgs = {}) {
  const message = args.message ?? "";
  return run({
    command: "commitlint",
    args: {
      extends: "@commitlint/config-conventional",
      env: message
    }
  });
}

export async function lintCommitAction() {
  lintCommit({
    message: process.env.HUSKY_GIT_PARAMS
  });
}

export default createCommand("commit")
  .description("lint a commit message from husky")
  .action(lintCommitAction);
