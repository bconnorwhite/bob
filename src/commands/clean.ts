import { resolve } from "path";
import { existsSync, unlinkSync, rmdirSync } from "fs";
import commander from "commander";
import { watch } from "chokidar";
import { getSourceDir, getBuildDir } from "../structure";

export function clean() {
  const src = getSourceDir();
  const build = getBuildDir();
  watch(src.relative).on("unlink", (path) => {
    const match = path.match(/^src\/(.*)\.tsx?$/);
    if(match) {
      path = resolve(build.relative, match[1]);
      [".js", ".d.ts"].forEach((ext) => {
        const file = `${path}${ext}`;
        if(existsSync(file)) {
          unlinkSync(file);
        }
      });
    }
  }).on("unlinkDir", (path) => {
    const match = path.match(new RegExp(`^${src.name}\/(.*)$`));
    if(match) {
      path = resolve(build.relative, match[1]);
      if(existsSync(path)) {
        rmdirSync(path);
      }
    }
  });
}

export default (program: commander.Command) => {
  program
    .command("clean")
    .description("watch to clean up after files or directories are moved or removed")
    .action(clean);
}
