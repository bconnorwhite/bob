import { createCommand } from "commander-version";
import { hasYarn } from "which-pm-lockfile";
import { getGitignore, getBuildDir, getCoverageDir, getEnv } from "../../../structure";
import join from "join-newlines";

export async function initGitignore() {
  const gitignore = getGitignore();
  return gitignore.exists().then(async (exists) => {
    if(!exists) {
      return hasYarn().then((yarn) => {
        return gitignore.write(join([
          `/${getBuildDir().relative}`,
          `/${getCoverageDir().relative}`,
          "node_modules",
          `${getEnv().relative}`,
          `${yarn ? "yarn-error.log" : ""}`
        ]));
      });
    } else {
      return undefined;
    }
  });
}

export async function initGitignoreAction() {
  initGitignore();
}

export default createCommand("gitignore")
  .description("initialize .gitignore")
  .action(initGitignoreAction);
