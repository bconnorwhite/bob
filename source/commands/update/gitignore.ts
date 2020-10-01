import { createCommand } from "commander-version";
import { hasYarn } from "which-pm-lockfile";
import { getGitignore, getBuildDir, getCoverageDir, getEnv } from "../../structure";
import join from "join-newlines";

export async function updateGitignore() {
  return hasYarn().then((yarn) => {
    return getGitignore().write(join([
      `/${getBuildDir().relative}`,
      `/${getCoverageDir().relative}`,
      "node_modules",
      `${getEnv().relative}`,
      `${yarn ? "yarn-error.log" : ""}`
    ]));
  });
}

export async function updateGitignoreAction() {
  updateGitignore();
}

export default createCommand("gitignore")
  .description(`update ${getGitignore().relative}`)
  .action(updateGitignoreAction);
