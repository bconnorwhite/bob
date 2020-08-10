import commander from "commander";
import { access, constants } from "fs";
import { join } from "path";
import exec from "@bconnorwhite/exec";
import { getRootDir } from "@bconnorwhite/package";
import { getEnv, defaultDockerDir } from "../utils";

export type DockerizeArgs = {
  detach?: boolean;
  environment?: string;
}

export const defaultDockerComposeFile = "docker-compose.yml";

export function dockerize({ detach = false, environment }: DockerizeArgs) {
  const env = getEnv();
  const NODE_ENV = environment ?? env.NODE_ENV;
  const file = join(getRootDir().path, `${defaultDockerDir}/${NODE_ENV}/${defaultDockerComposeFile}`);
  access(file, constants.R_OK, (err) => {
    exec({
      command: "docker-compose",
      args: "up",
      flags: {
        detach,
        file: err ? undefined : file
      },
      env
    });
  });
}

export default (program: commander.Command) => {
  program
    .command("dockerize")
    .description("run docker-compose up on a docker-compose file derived from NODE_ENV")
    .option("-d --detach", "run containers in the background")
    .option("-e --environment <value>", "value to override NODE_ENV")
    .action(dockerize);
}
