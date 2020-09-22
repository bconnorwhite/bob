import { createCommand } from "commander-version";
import { exec, Arg } from "@bconnorwhite/exec";
import { list } from "./list";

export async function count() {
  return list().then((files) => {
    exec({
      command: "wc",
      args: [{ l: true } as Arg].concat(files)
    });
  });
}

export async function countAction() {
  count();
}

export default createCommand("count")
  .description("count lines across source files")
  .action(countAction);
