import { createCommand } from "commander-version";
import run from "package-run";

export type LintCommitArgs = {
  env?: string;
}

function getEnv() {
  if(process.env.HUSKY_GIT_PARAMS) {
    return "HUSKY_GIT_PARAMS"
  } else {
    process.env.BOB_GIT_PARAMS = ".git/COMMIT_EDITMSG";
    return "BOB_GIT_PARAMS";
  }
}

export async function lintCommit(args: LintCommitArgs = {}) {
  const env = args.env ?? getEnv();
  return run({
    command: "commitlint",
    args: {
      extends: "@commitlint/config-conventional",
      env
    }
  });
}

export async function lintCommitAction() {
  lintCommit();
}

export default createCommand("commit")
  .description("lint a commit message from husky")
  .action(lintCommitAction);
