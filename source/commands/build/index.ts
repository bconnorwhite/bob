import { resolve } from "path";
import { existsSync, unlinkSync, rmdirSync } from "fs";
import { createCommand } from "commander";
import { watch, FSWatcher } from "chokidar";
import { RunResult } from "package-run";
import { getSourceDir, getBuildDir } from "../../structure";
import buildSourceCommand, { buildSourceAction, buildSource, buildSourceOutputHandler } from "./source";
import buildTypesCommand, { buildTypesAction, buildTypes, buildTypesOutputHandler } from "./types";

export type BuildArgs = {
  watch?: boolean;
  silent?: boolean;
  debug?: boolean;
};

export type BuildResult = {
  source: Promise<RunResult>;
  types: Promise<RunResult>;
}

let watcher: FSWatcher;
const extensions: string[] = [];

export function clean(extension: string) {
  const src = getSourceDir();
  const build = getBuildDir();
  if(watcher === undefined) {
    watcher = watch(src.relative);
    watcher.on("unlinkDir", (path) => {
      const match = path.match(new RegExp(`^${src.name}\/(.*)$`));
      if(match) {
        const dir = resolve(build.relative, match[1]);
        if(existsSync(dir)) {
          rmdirSync(dir, { recursive: true });
        }
      }
    });
    watcher.on("unlink", (path) => {
      const match = path.match(/^src\/(.*)\.tsx?$/);
      if(match) {
        path = resolve(build.relative, match[1]);
        extensions.forEach((ext) => {
          const file = `${path}${ext}`;
          if(existsSync(file)) {
            unlinkSync(file);
          }
        });
      }
    });
  }
  extensions.push(extension);
}

export function build(args: BuildArgs): BuildResult { 
  return {
    source: buildSource(args),
    types: buildTypes(args)
  }
}

export function buildAction(args: BuildArgs) {
  const { source, types } = build(args);
  buildSourceOutputHandler(source);
  buildTypesOutputHandler(types);
}

export default createCommand("build")
  .description("build and output type declaration files")
  .option("-w --watch", "watch files for changes")
  .option("-s --silent", "silent output")
  .addCommand(buildSourceCommand)
  .addCommand(buildTypesCommand)
  .action(buildAction);

export {
  buildSourceCommand,
  buildSourceAction,
  buildSource,
  buildTypesCommand,
  buildTypesAction,
  buildTypes
}
