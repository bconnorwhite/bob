import { resolve } from "path";
import { createCommand } from "commander";
import ora from "ora";
import run, { RunResult } from "package-run"
import { getSourceDir, getBuildDir } from "../../structure";
import { clean, BuildArgs } from "./";

export function buildSource({ watch, silent = true }: BuildArgs) {
  if(watch) {
    clean(".js");
  }
  return run({
    command: "babel",
    args: getSourceDir().relative,
    flags: {
      "out-dir": getBuildDir().relative,
      "config-file": resolve(__dirname, "config-babel.json"),
      "extensions": ".ts,.tsx",
      "delete-dir-on-start": true,
      "copy-files": true,
      "watch": watch
    },
    silent
  });
}

export function buildSourceOutputHandler(promise: Promise<RunResult>) {
  const sourceSpinner = ora("Building...").start();
  promise.then((result) => {
    if(result.error) {
      sourceSpinner.fail(result.error);
      console.log(result.colorRunOutput);
    } else {
      sourceSpinner.succeed(result.runOutput.replace("with Babel ", ""));
    }
  });
}

export function buildSourceAction(args: BuildArgs) {
  buildSourceOutputHandler(buildSource(args));
}

export default createCommand("source")
  .description("build source files")
  .option("-w --watch", "Watch files for changes")
  .action(buildSourceAction);
