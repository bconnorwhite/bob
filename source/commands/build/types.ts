import { createCommand } from "commander-version";
import run, { getString, RunResult } from "package-run"
import ora from "ora";
import { getBuildDir } from "../../structure";
import { clean, BuildArgs } from "./";

async function getCommand({ watch, silent = true }: BuildArgs) {
  return {
    command: "tsc",
    flags: {
      "declaration": true,
      "emitDeclarationOnly": true,
      "outDir": getBuildDir().relative,
      watch
    },
    silent
  };
}

export async function buildTypes(args: BuildArgs) {
  if(args.watch) {
    clean(".d.ts");
  }
  return getCommand(args).then((command) => {
    return run(command);
  });
}

export function buildTypesOutputHandler(promise: Promise<RunResult>) {
  const typesSpinner = ora("Generating type declaration files...").start();
  promise.then((result) => {
    if(result.error) {
      typesSpinner.fail(result.error.replace("error ", ""));
      console.info(result.colorRunOutput);
    } else {
      typesSpinner.succeed("Successfully generated type declaration files.");
    }
  });
}

export function buildTypesAction(args: BuildArgs) {
  if(args.debug) {
    getCommand(args).then((command) => {
      getString(command).then((value) => console.info(value));
    })
  } else {
    buildTypesOutputHandler(buildTypes(args));
  }
}

export default createCommand("types")
  .description("output type declaration files")
  .option("-w --watch", "Watch files for changes")
  .option("-s --silent", "silent output")
  .option("-d --debug", "output command")
  .action(buildTypesAction);
