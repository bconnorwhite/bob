import { createCommand } from "commander";
import { access, constants } from "fs";
import exec from "@bconnorwhite/exec";
import { getDockerDir } from "../../structure";
import { getEnv } from "../../utils";

export type DockerUpArgs = {
  detach?: boolean;
  environment?: string;
}

export function dockerUp({ detach = true, environment }: DockerUpArgs) {
  const env = getEnv();
  const NODE_ENV = environment ?? env.NODE_ENV;
  if(NODE_ENV) {
    const file = getDockerDir(NODE_ENV).files().compose;
    access(file.path, constants.R_OK, (err) => {
      exec({
        command: "docker-compose",
        args: "up",
        flags: {
          detach,
          file: err ? undefined : file.path
        },
        env
      });
    });
  }
}

export function dockerUpAction(args: DockerUpArgs) {
  dockerUp({
    ...args,
    detach: args.detach ?? false,
  });
}

export default createCommand("up")
  .description("run docker-compose up on docker-compose.yml")
  .option("-d --detach", "run containers in the background")
  .option("-e --environment <value>", "value to override NODE_ENV")
  .action(dockerUpAction);
