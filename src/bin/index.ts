#!/usr/bin/env node
import { program } from "commander";
import { build, clean, watch, start, dev } from "../commands";
import { getVersion } from "@bconnorwhite/package";

build(program);
watch(program);
clean(program);
start(program);
dev(program);

const version = getVersion();

if(version) {
  program.version(version);
}

program.name("bob");

program.parse(process.argv);
