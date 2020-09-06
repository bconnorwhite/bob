#!/usr/bin/env node
import { program } from "commander";
import { version } from "../../package.json";
import {
  initCommand,
  buildCommand,
  watchCommand,
  startCommand,
  devCommand,
  listCommand,
  countCommand,
  dockerCommand
} from "../commands";

program
  .name("bob")
  .addCommand(initCommand)
  .addCommand(buildCommand)
  .addCommand(watchCommand)
  .addCommand(startCommand)
  .addCommand(devCommand)
  .addCommand(dockerCommand)
  .addCommand(countCommand)
  .addCommand(listCommand)
  .version(version, "-v --version")
  .parse();
