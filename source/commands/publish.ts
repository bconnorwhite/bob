import { createCommand } from "commander-version";
import { exec } from "@bconnorwhite/exec";
import { release } from "./release";

export async function publish() {
  return release().then(() => {
    return exec("npm", "publish");
  });
}

export async function publishAction() {
  publish();
}

export default createCommand("publish")
  .description("release and publish to NPM")
  .action(publishAction);
