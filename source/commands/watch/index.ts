import { createCommand } from "commander-version";
import { build } from "../build";
import watchSourceCommand, { watchSourceAction, watchSource } from "./source";
import watchTypesCommand, { watchTypesAction, watchTypes } from "./types";

export function watch() {
  return build({
    watch: true,
    silent: false
  });
}

export function watchAction() {
  watch();
}

export default createCommand("watch")
  .description("watch source files and build after changes")
  .addCommand(watchSourceCommand)
  .addCommand(watchTypesCommand)
  .action(watchAction);

export {
  watchSourceCommand,
  watchSourceAction,
  watchSource,
  watchTypesCommand,
  watchTypesAction,
  watchTypes
};
