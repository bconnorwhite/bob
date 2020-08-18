import {
  build,
  clean,
  watch,
  start,
  dev,
  buildAction,
  cleanAction,
  watchAction,
  startAction,
  devAction
} from "./commands";

import structure, {
  getSourceDir,
  getBuildDir,
  getDockerDir,
  define,
  defineFrom,
  Directory,
  File
} from "./structure";

export {
  build,
  watch,
  clean,
  start,
  dev,
  buildAction,
  cleanAction,
  watchAction,
  startAction,
  devAction,
  structure,
  getSourceDir,
  getBuildDir,
  getDockerDir,
  defineFrom,
  Directory,
  File
}
