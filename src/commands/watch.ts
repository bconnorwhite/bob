import commander from "commander";
import { build as runBuild, BuildArgs } from "./build";

export type WatchArgs = Pick<BuildArgs, "build"> & Pick<BuildArgs, "declaration">;

export function watch({ build, declaration }: WatchArgs) {
  runBuild({
    build,
    declaration,
    watch: true
  });
}

export default (program: commander.Command) => {
  program
    .command("watch")
    .description("watch code to build after changes")
    .option("-b --build", "Only output build files")
    .option("-d --declaration", "Only output declaration files")
    .action(watch);
}
