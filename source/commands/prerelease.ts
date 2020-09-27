import { createCommand } from "commander-version";
import { lint } from "./lint";
import { build } from "./build";
import { test } from "./test";

export async function prerelease() {
  return lint().then(async () => {
    return build({
      silent: false
    }).then(() => {
      return test();
    });
  });
}

export async function prereleaseAction() {
  prerelease();
}

export default createCommand("prerelease")
  .description("run lint, build, and test")
  .action(prereleaseAction);
