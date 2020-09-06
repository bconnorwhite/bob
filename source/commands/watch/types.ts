import { createCommand } from "commander";
import { buildTypes } from "../build/types";

export function watchTypes() {
  return buildTypes({
    watch: true,
    silent: false
  });
}

export function watchTypesAction() {
  watchTypes();
}

export default createCommand("types")
  .description("output type declarations after changes")
  .action(watchTypesAction);
