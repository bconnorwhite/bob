import { createCommand } from "commander-version";
import { updateGitignore } from "../../update/gitignore";
import { getGitignore } from "../../../structure";

export async function initGitignore() {
  const gitignore = getGitignore();
  return gitignore.exists().then(async (exists) => {
    if(!exists) {
      return updateGitignore();
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
