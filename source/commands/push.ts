import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";

export async function push() {
  return exec("git", ["push"]).then(() => {
    return exec("git", ["push", {
      tags: true
    }]);
  });
}

export async function pushAction() {
  push();
}

export default createCommand("push")
  .description("push git repo and tags")
  .action(pushAction);
