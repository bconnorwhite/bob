import commander from "commander";
import { access, constants } from "fs";
import exec from "@bconnorwhite/exec";
import { pkg } from "@bconnorwhite/package";
import { getEnv } from "../utils";
import { getDockerDir } from "../structure";

export type DockerBuildArgs = {
  context: string;
  tag?: string;
  ver?: boolean;
  latest?: boolean;
  environment?: string;
}

export function dockerBuild({ context, tag, ver = false, latest = false, environment }: DockerBuildArgs) {
  const env = getEnv();
  const NODE_ENV = environment ?? env.NODE_ENV;
  if(NODE_ENV) {
    const file = getDockerDir(NODE_ENV).files().dockerfile;
    let tags: string[] = [];
    if(tag) {
      if(ver && !tag.includes(":") && pkg.version) {
        tags.push(`${tag}:${pkg.version}`);
      }
      if(latest) {
        tags.push(`${tag.split(":")[0]}:latest`);
      }
    }
    access(file.path, constants.R_OK, (err) => {
      exec({
        command: "docker",
        args: [
          "build",
          context
        ],
        flags: {
          file: err ? undefined : file.path,
          tag: tags
        },
        env
      });
    });
  }
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
