import commander from "commander";
import nodemon from "nodemon";
import { getMainDir } from "@bconnorwhite/package";
import exec from "@bconnorwhite/exec";
import { watch as runWatch } from "./watch";

export type StartArgs = {
  dev: boolean;
};

export function start({ dev }: StartArgs) {
  const main = getMainDir();
  if(main) {
    if(dev === false) {
      exec(`NODE_ENV=production node ${main.relative}`);
    } else {
      runWatch({
        build: true,
        declaration: true
      });
      nodemon({
        script: main.relative,
        ext: "js json",
        env: {
          NODE_ENV: "development"
        }
      });
    }
  } else {
    throw Error("Missing 'main' in package.json");
  }
}

export default (program: commander.Command) => {
  program
    .command("start")
    .description("start the script defined in the main field of package.json")
    .option("-d --dev", "set NODE_ENV to 'development' and watch for changes")
    .action(start);
}
