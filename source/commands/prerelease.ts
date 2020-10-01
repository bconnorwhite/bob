import { createCommand } from "commander-version";
import { lintAction } from "./lint";
import { buildAction } from "./build";
import { testAction } from "./test";

export async function prerelease() {
  return lintAction().then(async () => {
    return buildAction().then(() => {
      return testAction();
    });
  });
}

export async function prereleaseAction() {
  prerelease();
}

export default createCommand("prerelease")
  .description("run lint, build, and test")
  .action(prereleaseAction);
