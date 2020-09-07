import { createCommand } from "commander";
import { buildSource } from "../build/source";

export function watchSource() {
  return buildSource({
    watch: true,
    silent: false
  });
}

export function watchSourceAction() {
  watchSource();
}

export default createCommand("source")
  .description("build source files after changes")
  .action(watchSourceAction);
