import nodemon from "nodemon";
import waitOn from "wait-on";
import dotenv from "dotenv";
import { createCommand } from "commander-version";
import { getMain } from "@bconnorwhite/package";
import { exec } from "@bconnorwhite/exec";
import { getBuildDir } from "../structure";
import { watch } from "./watch";
import { getEnv } from "../utils";

export type StartArgs = {
  dev: boolean;
  ignore?: string[];
};

export function start({ dev, ignore = [] }: StartArgs) {
  const main = getMain();
  const promises: Promise<any>[] = [];
  if(dev) {
    promises.push(waitOn({ // wait for babel to remove main
      resources: [main.path],
      interval: 10,
      reverse: true
    }).then(() => { // wait for babel to create main
      waitOn({
        resources: [main.path]
      }).then(() => {
        nodemon({
          script: main.path,
          watch: [getBuildDir().relative],
          ignore,
          ext: "js json",
          env: dotenv.config().parsed,
          stdout: false
        }).on("stdout", (stdout) => {
          console.info(stdout.toString());
        }).on("stderr", (stderr) => {
          console.error(stderr.toString());
        }).on("quit", () => {
          process.kill(process.pid, "SIGKILL");
        });
      });
    }));
    const { source, types } = watch();
    promises.push(source);
    promises.push(types);
  } else {
    promises.push(exec({
      command: "node",
      args: main.path,
      env: getEnv()
    }));
  }
  return Promise.all(promises);
}

export function startAction(args: StartArgs) {
  start(args);
}

export default createCommand("start")
  .description("start the script defined in the main field of package.json")
  .option("-d --dev", "set NODE_ENV to 'development' and watch for changes")
  .option("-i --ignore [ignore...]", "files or directories to ignore for restart")
  .action(startAction);
