import { createCommand } from "commander-version";
import { exec, Args } from "@bconnorwhite/exec";
import { getPackageManagerName } from "which-pm-lockfile";
import { release } from "./release";

export async function publish() {
  return release().then(async () => {
    return getPackageManagerName().then((pm = "npm") => {
      const args: Args = ["publish"];
      if(pm === "yarn") {
        args.push({
          "non-interactive": true
        });
      }
      return exec(pm, args);
    });
  });
}

export async function publishAction() {
  publish();
}

export default createCommand("publish")
  .description("release and publish to NPM")
  .action(publishAction);
