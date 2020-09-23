import { createCommand } from "commander-version";
import { hasYarn } from "which-pm-lockfile";
import { getGitignore, getBuildDir, getCoverageDir } from "../../../structure";

export async function initGitignore() {
  const gitignore = getGitignore();
  return gitignore.exists().then(async (exists) => {
    if(!exists) {
      return hasYarn().then((yarn) => {
        return gitignore.write(`/${getBuildDir().relative}\n/${getCoverageDir().relative}\nnode_modules\n.DS_Store\n${yarn ? "yarn-error.log" : ""}`);
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
