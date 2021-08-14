import { resolve } from "path";
import { existsSync, unlinkSync, rmdirSync } from "fs";
import { createCommand } from "commander-version";
import { watch, FSWatcher } from "chokidar";
import { ExecResult } from "package-run";
import { getSourceDir, getBuildDir } from "../../structure";
import buildSourceCommand, { buildSourceAction, buildSource, buildSourceOutputHandler } from "./source";
import buildTypesCommand, { buildTypesAction, buildTypes, buildTypesOutputHandler } from "./types";

export type BuildArgs = {
  watch?: boolean;
  silent?: boolean;
  debug?: boolean;
};

export type BuildResult = {
  source: Promise<ExecResult>;
  types: Promise<ExecResult>;
};

let watcher: FSWatcher;
const extensions: string[] = [];

export function clean(extension: string) {
  const sourceDir = getSourceDir();
  const buildDir = getBuildDir();
  if(watcher === undefined) {
    watcher = watch(sourceDir.relative);
    watcher.on("unlinkDir", (path) => {
      const match = path.match(new RegExp(`^${sourceDir.name}/(.*)$`));
      if(match) {
        const dir = resolve(buildDir.relative, match[1]);
        if(existsSync(dir)) {
          rmdirSync(dir, { recursive: true });
        }
      }
    });
    watcher.on("unlink", (path) => {
      const match = path.match(/^src\/(.*)\.tsx?$/);
      if(match) {
        const fileName = resolve(buildDir.relative, match[1]);
        extensions.forEach((ext) => {
          const file = `${fileName}${ext}`;
          if(existsSync(file)) {
            unlinkSync(file);
          }
        });
      }
    });
  }
  extensions.push(extension);
}

export function build(args: BuildArgs) {
  return Promise.all([
    buildSource(args),
    buildTypes(args)
  ]);
}

export async function buildAction(args: BuildArgs = {}) {
  const source = buildSource(args);
  const types = buildTypes(args);
  return buildSourceOutputHandler(source).then(() => {
    return buildTypesOutputHandler(types);
  });
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
};
