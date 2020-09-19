#!/usr/bin/env node
import program from "commander-version";
import {
  initCommand,
  buildCommand,
  watchCommand,
  startCommand,
  devCommand,
  lintCommand,
  listCommand,
  countCommand,
  dockerCommand
} from "../commands";

program(__dirname)
  .name("bob")
  .addCommand(initCommand)
  .addCommand(buildCommand)
  .addCommand(watchCommand)
  .addCommand(startCommand)
  .addCommand(devCommand)
  .addCommand(lintCommand)
  .addCommand(dockerCommand)
  .addCommand(countCommand)
  .addCommand(listCommand)
  .parse();
