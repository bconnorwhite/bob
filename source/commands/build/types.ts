import { createCommand } from "commander";
import run, { getString, RunResult } from "package-run"
import ora from "ora";
import { getBuildDir } from "../../structure";
import { list } from "../list";
import { clean, BuildArgs } from "./";

async function getCommand({ watch, silent = true }: BuildArgs) {
  return list().then((files) => ({
    command: "tsc",
    args: files,
    flags: {
      "declaration": true,
      "emitDeclarationOnly": true,
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "jsx": "preserve",
      "lib": "dom,esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "noFallthroughCasesInSwitch": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "outDir": getBuildDir().relative,
      "removeComments": true,
      "resolveJsonModule": true,
      "skipLibCheck": true,
      "strict": true,
      "target": "esnext",
      "watch": watch
    },
    silent
  }));
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
  const typesSpinner = ora("Building...").start();
  promise.then((result) => {
    if(result.error) {
      typesSpinner.fail(result.error.replace("error ", ""));
      console.log(result.colorRunOutput);
    } else {
      typesSpinner.succeed("Successfully generated type declaration files.");
    }
  });
}

export function buildTypesAction(args: BuildArgs) {
  if(args.debug) {
    getCommand(args).then((command) => {
      getString(command).then((value) => console.log(value));
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
