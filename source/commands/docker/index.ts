import { createCommand } from "commander";
import dockerBuildCommand, { dockerBuild, dockerBuildAction, DockerBuildArgs } from "./build";
import dockerUpCommand, { dockerUp, dockerUpAction, DockerUpArgs } from "./up";

export default createCommand("docker")
  .description("run docker commands")
  .addCommand(dockerBuildCommand)
  .addCommand(dockerUpCommand);

export {
  dockerBuildCommand,
  dockerBuildAction,
  dockerBuild,
  DockerBuildArgs,
  dockerUpCommand,
  dockerUpAction,
  dockerUp,
  DockerUpArgs
}
