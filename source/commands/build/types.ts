import ora from "ora";
import { createCommand } from "commander-version";
import run, { executableToString, ExecResult } from "package-run"
import { getBuildDir } from "../../structure";
import { clean, BuildArgs } from "./";

async function getCommand({ watch, silent = true }: BuildArgs) {
  return {
    command: "tsc",
    args: {
      declaration: true,
      emitDeclarationOnly: true,
      outDir: getBuildDir().relative,
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
    return run(command, { silent: true });
  });
}

export async function buildTypesOutputHandler(promise: Promise<ExecResult>) {
  const typesSpinner = ora("Generating type declaration files...").start();
  return promise.then((result) => {
    if(result.textError) {
      typesSpinner.fail(result.textError.replace("error ", ""));
      console.info(result.output);
    } else {
      typesSpinner.succeed("Successfully generated type declaration files.");
    }
  });
}

export function buildTypesAction(args: BuildArgs) {
  if(args.debug) {
    getCommand(args).then((command) => {
      executableToString(command).then((value) => console.info(value));
    });
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
