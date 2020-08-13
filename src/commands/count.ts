import commander from "commander";
import exec, { flagsToArgs } from "@bconnorwhite/exec";
import { getFiles } from "./list";

export async function count() {
  return getFiles().then((files) => {
    exec({
      command: "wc",
      args: flagsToArgs({ l: true }).concat(files)
    });
  });
}

export default (program: commander.Command) => {
  program
    .command("count")
    .description("count lines across source files")
    .action(count);
}
