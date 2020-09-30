import { createCommand } from "commander-version";
import { exec, Args } from "@bconnorwhite/exec";

export async function hasUpstream() {
  return exec("git", ["rev-parse", {
    "abbrev-ref": "master@{upstream}"
  }], { silent: true }).then(({ textOutput }) => {
    return textOutput === "origin/master";
  });
}

export async function push() {
  const args: Args = ["push"];
  const setUpstream = !hasUpstream();
  if(setUpstream) {
    args.concat([{
      "set-upstream": "origin"
    }, "master"]);
  }
  return exec("git", args).then(() => {
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
