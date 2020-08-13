import build, { build as buildAction } from "./build";
import clean, { clean as cleanAction } from "./clean";
import watch, { watch as watchAction } from "./watch";
import start, { start as startAction } from "./start";
import dev, { dev as devAction } from "./dev";
import list, { list as listAction } from "./list";
import count, { count as countAction } from "./count";
import dockerize, { dockerize as dockerizeAction } from "./dockerize";
import dockerBuild, { dockerBuild as dockerBuildAction } from "./docker-build";

export {
  build,
  clean,
  watch,
  start,
  dev,
  list,
  count,
  dockerize,
  dockerBuild,
  buildAction,
  cleanAction,
  watchAction,
  startAction,
  devAction,
  listAction,
  dockerizeAction,
  dockerBuildAction
}
