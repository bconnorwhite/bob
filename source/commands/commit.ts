import { createCommand } from "commander-version";
import run from "package-run";

export async function commit() {
  return run({ command: "cz" }, { silent: true });
}

export async function commitAction() {
  commit();
}

export default createCommand("commit")
  .description("create a conventional commit")
  .action(commitAction);
