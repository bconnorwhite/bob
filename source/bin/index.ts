#!/usr/bin/env node
import program from "commander-version";
import {
  initCommand,
  buildCommand,
  watchCommand,
  startCommand,
  devCommand,
  commitCommand,
  testCommand,
  lintCommand,
  prereleaseCommand,
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
  .addCommand(testCommand)
  .addCommand(prereleaseCommand)
  .addCommand(commitCommand)
  .addCommand(dockerCommand)
  .addCommand(countCommand)
  .addCommand(listCommand)
  .parse();
