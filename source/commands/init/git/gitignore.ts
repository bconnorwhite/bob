import { createCommand } from "commander-version";
import { hasYarn } from "which-pm-lockfile";
import { getGitignore, getBuildDir } from "../../../structure";

export async function initGitignore() {
  const buildRelative = getBuildDir().relative;
  const gitignore = getGitignore();
  return gitignore.exists().then(async (exists) => {
    if(!exists) {
      return hasYarn().then((yarn) => {
        return gitignore.write(`/${buildRelative}\nnode_modules\n.DS_Store\n${yarn ? "yarn-error.log" : ""}`);
      });
    }
  });
}

export async function initGitignoreAction() {
  initGitignore();
}

export default createCommand("gitignore")
  .description("initialize .gitignore")
  .action(initGitignoreAction);
