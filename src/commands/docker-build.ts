import commander from "commander";
import { access, constants } from "fs";
import { join } from "path";
import exec from "@bconnorwhite/exec";
import { getVersion, getRootDir } from "@bconnorwhite/package";
import { getEnv, defaultDockerDir } from "../utils";

export type DockerBuildArgs = {
  context: string;
  tag?: string;
  ver?: boolean;
  latest?: boolean;
  environment?: string;
}

export const defaultDockerfile = "Dockerfile";

export function dockerBuild({ context, tag, ver = false, latest = false, environment }: DockerBuildArgs) {
  const env = getEnv();
  const NODE_ENV = environment ?? env.NODE_ENV;
  let tags: string[] = [];
  if(tag) {
    if(ver && !tag.includes(":")) {
      tags.push(`${tag}:${getVersion()}`);
    }
    if(latest) {
      tags.push(`${tag.split(":")[0]}:latest`);
    }
  }
  const file = join(getRootDir().path, `${defaultDockerDir}/${NODE_ENV}/${defaultDockerfile}`);
  access(file, constants.R_OK, (err) => {
    exec({
      command: "docker",
      args: [
        "build",
        context
      ],
      flags: {
        file: err ? undefined : file,
        tag: tags
      },
      env
    });
  })
};

export default (program: commander.Command) => {
  program
    .command("docker-build <context>")
    .description("run docker build on a Dockerfile derived from NODE_ENV")
    .option("-t --tag <tag>", "image name")
    .option("-v --ver", "append version from package.json to image tag")
    .option("-l --latest", "append :latest to a second image tag")
    .option("-e --environment <environment>", "value to override NODE_ENV")
    .action(dockerBuild);
}
