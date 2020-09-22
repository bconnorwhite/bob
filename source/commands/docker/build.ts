import { createCommand } from "commander-version";
import { promises, constants } from "fs";
import { exec, ExecResult } from "@bconnorwhite/exec";
import { pkg } from "@bconnorwhite/package";
import { getEnv } from "../../utils";
import { getDockerDir } from "../../structure";

export type DockerBuildArgs = {
  context: string;
  tag?: string;
  ver?: boolean;
  latest?: boolean;
  environment?: string;
}

function execBuild(context: string, tag: string[], file?: string, env?: NodeJS.ProcessEnv) {
  return exec({
    command: "docker",
    args: [
      "build",
      context, {
        file,
        tag
      }
    ],
    env
  });
}

export async function dockerBuild({ context, tag, ver = false, latest = false, environment }: DockerBuildArgs): Promise<ExecResult | undefined> {
  const env = getEnv();
  const NODE_ENV = environment ?? env.NODE_ENV;
  if(NODE_ENV) {
    const file = getDockerDir(NODE_ENV).files().dockerfile;
    const tags: string[] = [];
    if(tag) {
      if(ver && !tag.includes(":") && pkg?.version) {
        tags.push(`${tag}:${pkg.version}`);
      }
      if(latest) {
        tags.push(`${tag.split(":")[0]}:latest`);
      }
    }
    return promises.access(file.path, constants.R_OK).then(() => {
      return execBuild(context, tags, file.path, env);
    }).catch(() => {
      return execBuild(context, tags, undefined, env);
    });
  } else {
    return Promise.resolve(undefined);
  }
}

export function dockerBuildAction(args: DockerBuildArgs) {
  dockerBuild(args);
}

export default createCommand("build")
  .description("run docker build on Dockerfile")
  .arguments("<context>")
  .option("-t --tag <tag>", "image name")
  .option("-v --ver", "append version from package.json to image tag")
  .option("-l --latest", "append :latest to a second image tag")
  .option("-e --environment <environment>", "value to override NODE_ENV")
  .action(dockerBuildAction);
