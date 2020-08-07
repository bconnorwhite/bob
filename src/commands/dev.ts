import commander from "commander";
import { start as runStart } from "./start";

export function dev() {
  runStart({
    dev: true
  });
}

export default (program: commander.Command) => {
  program
    .command("dev")
    .description("start with NODE_ENV set to 'development' and watch for changes")
    .action(dev);
}
