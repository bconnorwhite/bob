import commander from "commander";
import { access, constants } from "fs";
import exec from "@bconnorwhite/exec";
import { getDockerDir } from "../structure";
import { getEnv } from "../utils";

export type DockerizeArgs = {
  detach?: boolean;
  environment?: string;
}

export const defaultDockerComposeFile = "docker-compose.yml";

export function dockerize({ detach = false, environment }: DockerizeArgs) {
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

export default (program: commander.Command) => {
  program
    .command("dockerize")
    .description("run docker-compose up on a docker-compose file derived from NODE_ENV")
    .option("-d --detach", "run containers in the background")
    .option("-e --environment <value>", "value to override NODE_ENV")
    .action(dockerize);
}
