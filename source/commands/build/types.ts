import { createCommand } from "commander";
import run, { RunResult } from "package-run"
import ora from "ora";
import { getBuildDir } from "../../structure";
import { list } from "../list";
import { clean, BuildArgs } from "./";

export async function buildTypes({ watch, silent = true }: BuildArgs) {
  if(watch) {
    clean(".d.ts");
  }
  return list().then((files) => run({
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

export function buildTypesOutputHandler(promise: Promise<RunResult>) {
  const typesSpinner = ora("Building...").start();
  promise.then((result) => {
    if(result.error) {
      typesSpinner.fail(result.error.replace("error ", ""));
      console.log(result.colorRunOutput);
    } else {
      typesSpinner.succeed(result.runOutput);
    }
  });
}

export function buildTypesAction(args: BuildArgs) {
  buildTypesOutputHandler(buildTypes(args));
}

export default createCommand("types")
  .description("output type declaration files")
  .option("-w --watch", "Watch files for changes")
  .action(buildTypesAction);
