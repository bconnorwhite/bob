import ora from "ora";
import { resolve } from "path";
import { createCommand } from "commander-version";
import run, { executableToString, ExecResult } from "package-run";
import { getSourceDir, getBuildDir } from "../../structure";
import { clean, BuildArgs } from "./";

function getCommand({ watch, silent = true }: BuildArgs) {
  return {
    command: "babel",
    args: [
      getSourceDir().relative, {
        "out-dir": getBuildDir().relative,
        "config-file": resolve(__dirname, "../../../babel.config.json"),
        "extensions": ".ts,.tsx",
        "delete-dir-on-start": true,
        "copy-files": true,
        watch
      }
    ],
    silent
  };
}

export function buildSource(args: BuildArgs) {
  if(args.watch) {
    clean(".js");
  }
  return run(getCommand(args), { silent: true });
}

export async function buildSourceOutputHandler(promise: Promise<ExecResult>) {
  const sourceSpinner = ora(`Building from '${getSourceDir().relative}'...`).start();
  return promise.then((result) => {
    if(result.textError) {
      sourceSpinner.fail(result.textError);
      console.info(result.output);
    } else {
      sourceSpinner.succeed(result.textOutput.replace("compiled", "built").replace("with Babel ", ""));
    }
  });
}

export function buildSourceAction(args: BuildArgs) {
  if(args.debug) {
    executableToString(getCommand(args)).then((value) => console.info(value));
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
