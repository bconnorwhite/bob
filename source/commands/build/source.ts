import { resolve } from "path";
import { createCommand } from "commander-version";
import ora from "ora";
import run, { getString, RunResult } from "package-run"
import { getSourceDir, getBuildDir } from "../../structure";
import { clean, BuildArgs } from "./";

function getCommand({ watch, silent = true }: BuildArgs) {
  return {
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
  }
}

export function buildSource(args: BuildArgs) {
  if(args.watch) {
    clean(".js");
  }
  return run(getCommand(args));
}

export function buildSourceOutputHandler(promise: Promise<RunResult>) {
  const sourceSpinner = ora(`Compiling from '${getSourceDir().relative}'...`).start();
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
  if(args.debug) {
    getString(getCommand(args)).then((value) => console.log(value))
  } else {
    buildSourceOutputHandler(buildSource(args));
  }
}

export default createCommand("source")
  .description("build source files")
  .option("-w --watch", "watch files for changes")
  .option("-s --silent", "silent output")
  .option("-d --debug", "output command")
  .action(buildSourceAction);
