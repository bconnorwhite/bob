import { createCommand } from "commander-version";
import { start as runStart, StartArgs } from "./start";

export type DevArgs = Pick<StartArgs, "ignore">;

export function dev({ ignore }: DevArgs) {
  runStart({
    dev: true,
    ignore
  });
}

export function devAction(args: DevArgs) {
  dev(args);
}

export default createCommand("dev")
  .description("start with NODE_ENV set to 'development' and watch for changes")
  .option("-i --ignore [ignore...]", "files or directories to ignore for restart")
  .action(dev);
