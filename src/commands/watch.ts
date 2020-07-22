import commander from "commander";
import { build as runBuild } from "./build";

export function watch({ build, declaration }: { build: boolean; declaration: boolean }) {
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
